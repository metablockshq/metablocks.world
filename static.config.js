import path from "path";
import jdown from "jdown";
import marked from "marked";
import { getHighlighter } from "shiki";
import { rebuildRoutes } from "react-static/node";
import chokidar from "chokidar";
import { paramCase } from "change-case";
import R from "ramda";

const contentDir = "./content";

// chokidari keval dev mode main
if (process.env.REACT_STATIC_ENV === "development") {
  chokidar.watch(contentDir).on("all", () => {
    try {
      rebuildRoutes();
    } catch (e) {
      // it's okay
    }
  });
}

const getSitePages = (content) => {
  const sitePagesObj = R.mapObjIndexed(
    (val, key, obj) => ({
      path: `/${val.slug}`,
      template: "src/templates/Page",
      getData: () => val,
    }),
    content.pages
  );

  return R.values(sitePagesObj);
};

const getAuthorPages = (content) => {
  return R.map(
    (a) => ({
      path: `/authors/${a.slug}`,
      template: "src/templates/Author",
      getData: () => a,
    }),
    R.values(content.authors)
  );
};

const stripJobContents = (job) =>
  R.omit(["requirements", "responsibilities", "intro"], job);

const getPublishedJobs = (content) =>
  R.filter((j) => j.isPublished, R.values(content.jobs));

const jobsWithoutContents = (content) =>
  R.map((j) => stripJobContents(j), getPublishedJobs(content));

/* Takes an object and a list of keys containing markdown.
 * Returns a new maps where values of the keys is converted from Markdown to Html.
 */
const convertMdKeysToHtml = (obj, keysToConvert) => {
  return R.mapObjIndexed((value, key) => {
    return R.contains(key, keysToConvert) ? marked.parse(value) : value;
  }, obj);
};

const getJobPages = (content) => {
  return R.map(
    (j) => ({
      path: `/jobs/${j.slug}`,
      template: "src/templates/Job",
      getData: () =>
        convertMdKeysToHtml(j, ["requirements", "responsibilities", "intro"]),
    }),
    getPublishedJobs(content)
  );
};

const getPublishedCampaigns = (content) =>
  R.filter((j) => j.isPublished, R.values(content.campaigns));

const getCampaignPages = (content) => {
  return R.map(
    (c) => ({
      path: `/campaigns/${c.slug}`,
      template: "src/templates/Campaign",
      getData: () => c,
    }),
    getPublishedCampaigns(content)
  );
};

/*********
 * Guides
 *********/
const getGuideChapterPages = (content) => {
  const guideChapterPagesObj = R.mapObjIndexed(
    (val, key, obj) => ({
      path: `/guides/${val.guideSlug}/${val.slug}`,
      template: "src/templates/guide/Chapter",
      getData: () => val,
    }),
    content.guidechapters // why no camelcasing? because jdown doesn't read camel casing on mac
  );

  return R.values(guideChapterPagesObj);
};

const getPublishedGuides = (content) =>
  R.filter((j) => j.isPublished, R.values(content.guides));

const getGuidePages = (content) => {
  const guidePagesObj = R.mapObjIndexed(
    (val, key, obj) => ({
      path: `/guides/${val.slug}`,
      template: "src/templates/Guide",
      getData: () => val,
    }),
    getPublishedGuides(content)
  );

  return R.values(guidePagesObj);
};

const generateGuideIndex = (guidePages, guideChapterPages, guideSlug) => {
  const guide = R.find(R.propEq("path", `/guides/${guideSlug}`))(guidePages);
  const chapters = R.filter(
    (cp) => cp.getData().guideSlug === guideSlug,
    guideChapterPages
  );

  const chaptersWithData = R.map(
    (c) => ({
      ...R.dissoc("getData", c),
      data: R.dissoc("contents", c.getData()),
    }),
    chapters
  );
  const sortedChapters = R.sortBy(
    R.path(["data", "chapterNumber"]),
    chaptersWithData
  );

  return {
    guide: {
      ...R.dissoc("getData", guide),
      data: R.dissoc("contents", guide.getData()),
    },
    chapters: sortedChapters,
  };
};

const generateGuideIndices = (guidePages, guideChapterPages) => {
  return R.reduce(
    (acc, g) => {
      const guideSlug = g.getData().slug;
      return {
        ...acc,
        [guideSlug]: generateGuideIndex(
          guidePages,
          guideChapterPages,
          guideSlug
        ),
      };
    },
    {},
    guidePages
  );
};

const injectGuideIndex = (page, index) => {
  return {
    ...page,
    getData: () => ({ ...page.getData(), index }),
  };
};

/********
 * Posts
 ********/

// need weak inequality check so objects with no `publishedOn` key return false
const isPublished = (post) => post.publishedOn != null;

const postsToPostPages = (posts) => {
  return R.map(
    (post) => ({
      path: `/blog/${post.slug}`,
      template: "src/templates/blog/Post",
      data: post,
    }),
    posts
  );
};

const relatedSlugs = (post) => R.pathOr([], ["data", "relatedSlugs"], post);

/**
   - for a given list of posts and a specific post,
   - find all posts related to this specific post,
   - by reading the `relatedSlugs` on the post
*/
const relatedPosts = (posts, post) => {
  const postRelatedSlugs = relatedSlugs(post);
  return R.filter((p) => R.contains(p.data.slug, postRelatedSlugs), posts);
};

const injectRelatedPosts = (posts) => (post) =>
  R.assocPath(["data", "relatedPosts"], relatedPosts(posts, post), post);

const rawDataToGetData = (post) => {
  // this has to be a constant to prevent it from being passed as a value
  // which causes a problem when data is stripped
  const postDataCopy = R.clone(post.data);
  return R.assoc("getData", () => postDataCopy, post);
};

const stripPostContents = (post) => R.dissocPath(["data", "contents"], post);

const stripRelatedPostsContent = (post) =>
  R.assocPath(
    ["data", "relatedPosts"],
    R.map(stripPostContents, post.data.relatedPosts),
    post
  );

const stripRelatedPosts = (post) =>
  R.dissocPath(["data", "relatedPosts"], post);

const injectAuthor = (authors) => (post) => {
  const author = R.find(R.propEq("slug", post.data.author))(R.values(authors));
  const authorWithoutContents = R.dissoc("contents", author);
  return R.assocPath(["data", "author"], authorWithoutContents, post);
};

const injectRelatedPostAuthors = (authors) => (post) => {
  const relatedPosts = R.pathOr([], ["data", "relatedPosts"], post);
  const withAuthors = R.map(injectAuthor(authors), relatedPosts);
  return R.assocPath(["data", "relatedPosts"], withAuthors, post);
};

/**
   - take an initial value of postPages and
   - transform it to the required form
 */
const transformPostPages = (postPages, authors) => (post) => {
  // R.compose works right to left, i.e.
  // the last fn will be applied first, followed by second last until first
  const transform = R.compose(
    rawDataToGetData,
    stripRelatedPostsContent,
    injectRelatedPostAuthors(authors),
    injectRelatedPosts(postPages),
    injectAuthor(authors)
  );

  return transform(post);
};

const sortByPublishDateDesc = (postPages) => {
  const dateDiff = (a, b) => {
    return (
      new Date(b.data.publishedOn).getTime() -
      new Date(a.data.publishedOn).getTime()
    );
  };

  return R.sort(dateDiff, postPages);
};

const byPublishYear = R.groupBy((postPage) =>
  new Date(postPage.data.publishedOn).getFullYear()
);

// https://marked.js.org/using_advanced
const markdownOptionsFactory = (highlighter) => ({
  highlight: (code, lang) => highlighter.codeToHtml(code, lang),
});

const topTags = (postPages, n) => {
  const tags = R.compose(
    R.countBy(R.identity),
    R.flatten
  )(R.map(({ data }) => data.tags, postPages));

  const tagsList = R.zip(R.keys(tags), R.values(tags));
  const sortedTagList = R.sortBy(R.prop(1))(tagsList);
  const topNTags = R.takeLast(n)(sortedTagList);
  return R.map(R.prop(0), topNTags);
};

export default {
  // siteRoot: "https://krimlabs.com",
  plugins: [
    "react-static-plugin-react-router",
    // "react-static-plugin-sitemap"
  ],
  getRoutes: async () => {
    const highlighter = await getHighlighter({ theme: "monokai" });
    const content = await jdown(contentDir, {
      markdown: markdownOptionsFactory(highlighter),
    });

    // posts
    const publishedPosts = R.filter(isPublished, R.values(content.posts));
    const rawPostPages = postsToPostPages(publishedPosts);
    const txfmFn = transformPostPages(rawPostPages, content.authors);
    const postPages = R.map(txfmFn, rawPostPages);
    const sortedPostPages = sortByPublishDateDesc(postPages);

    const allPosts = R.map(
      R.compose(stripPostContents, stripRelatedPosts),
      sortedPostPages
    );

    const allPostsByYear = byPublishYear(allPosts);

    const recentPosts = R.take(8, allPosts);

    //
    const sitePages = getSitePages(content);
    const authorPages = getAuthorPages(content);
    const jobPages = getJobPages(content);
    const campaignPages = getCampaignPages(content);

    const guidePagesWithoutIndex = getGuidePages(content);
    const guideChapterPagesWithoutIndex = getGuideChapterPages(content);
    const guideIndices = generateGuideIndices(
      guidePagesWithoutIndex,
      guideChapterPagesWithoutIndex
    );
    const guidePages = R.map(
      (g) => injectGuideIndex(g, guideIndices[g.getData().slug]),
      guidePagesWithoutIndex
    );
    const guideChapterPages = R.map(
      (gc) => injectGuideIndex(gc, guideIndices[gc.getData().guideSlug]),
      guideChapterPagesWithoutIndex
    );

    return [
      {
        path: "/",
        template: "src/templates/MetaBlocksLanding.js",
        getData: () => ({ recentPosts, tags: topTags(allPosts, 5) }),
      },
      {
        path: "/gleam-thank-you",
        template: "src/templates/GleamThankYou.js",
        getData: () => {},
      },
      {
        path: "/blog",
        template: "src/templates/Blog",
        getData: () => ({
          allPostsByYear,
          allPosts,
          tags: topTags(allPosts, 10),
        }),
      },
      {
        path: "/careers",
        template: "src/templates/Careers",
        getData: () => ({ jobs: jobsWithoutContents(content) }),
      },

      ...postPages,
      ...sitePages,
      ...authorPages,
      ...jobPages,
      ...campaignPages,
      ...guidePages,
      ...guideChapterPages,
    ];
  },
};

export {
  contentDir,
  isPublished,
  relatedSlugs,
  relatedPosts,
  injectRelatedPosts,
  postsToPostPages,
  stripRelatedPostsContent,
  stripPostContents,
  rawDataToGetData,
  injectRelatedPostAuthors,
  injectAuthor,
  generateGuideIndex,
  generateGuideIndices,
  injectGuideIndex,
};
