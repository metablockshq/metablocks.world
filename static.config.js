import path from 'path';
import jdown from 'jdown';
import {rebuildRoutes} from 'react-static/node';
import chokidar from 'chokidar';
import {paramCase} from 'change-case';
import R from 'ramda';


const contentDir = './content';

// chokidari keval dev mode main
if (process.env.REACT_STATIC_ENV === 'development') {
  chokidar.watch(contentDir).on('all', () => {
    try {rebuildRoutes()}
    catch(e) {
      // it's okay
    }
  });
}

const getSitePages = (content) => {
  const sitePagesObj = R.mapObjIndexed((val, key, obj) => ({
    path: `/${key}`,
    template: 'src/templates/Page',
    getData: () => val
  }), content.pages);

  return R.values(sitePagesObj);
}


// need weak inequality check so objects with no `publishedOn` key return false
const isPublished = (post) => post.publishedOn != null;

const postsToPostPages = (posts) => {
  return R.map(post => ({
    path: `/blog/${post.slug}`,
    template: 'src/templates/blog/Post',
    rawData: post,
    getData: () => post
  }), posts)
}

const sortByPublishDate = (postPages) => {
  const byPublishedOnDesc = R.comparator((a, b) => {
    return a.data.publishedOn > b.data.publishedOn;
  });

  return R.sort(byPublishedOnDesc, postPages);
}

const relatedSlugs = post => R.pathOr([], ["rawData", "relatedSlugs"], post);

/**
   - for a given list of posts and a specific post,
   - find all posts related to this specific post,
   - by reading the `relatedSlugs` on the post
*/
const relatedPosts = (posts, post) => {
  const postRelatedSlugs = relatedSlugs(post)
  return R.filter(p => R.contains(p.slug, postRelatedSlugs), posts);
}

const injectRelatedPosts = posts => post =>
      R.assocPath(["rawData", "relatedPosts"], relatedPosts(posts, post), post);

const rawDataToGetData = post =>
      R.assoc("getData", () => R.clone(post.rawData), post);

const dissocRawData = post => R.dissoc("rawData", post)

/**
   - take an initial value of postPages and
   - transform it to the required form
 */
const transformPostPages = postPages => post => {
  const transform = R.compose(
    dissocRawData,
    rawDataToGetData,
    injectRelatedPosts(postPages),
  );

  return transform(post);
}


export default {
  siteRoot: 'https://krimlabs.com',
  plugins: [
    'react-static-plugin-react-router',
    'react-static-plugin-sitemap'
  ],
  getRoutes: async () => {
    const content = await jdown(contentDir);
    const publishedPosts = R.filter(isPublished, R.values(content.posts));
    const rawPostPages = postsToPostPages(publishedPosts);
    const txfmFn = transformPostPages(rawPostPages)
    const postPages = R.map(txfmFn, rawPostPages)
    const featuredPosts = []
    // const featuredPosts = R.filter(p => p.getData().featured, postPages);
    // const latestPosts = R.take(3, sortByPublishDate(postPages));

    const sitePages = getSitePages(content);
    return [{
      path: '/',
      template: 'src/templates/Landing',
      getData: () => ({featuredPosts, latestPosts: []})
    }, {
      path: '/blog',
      template: 'src/templates/Blog',
      getData: () => ({allPosts: postPages, featuredPosts})
    },
    ...postPages,
    ...sitePages];
  }
}

export {contentDir, isPublished, relatedSlugs, relatedPosts, injectRelatedPosts, postsToPostPages}
