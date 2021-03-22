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
    data: post
  }), posts)
}

const relatedSlugs = post => R.pathOr([], ["data", "relatedSlugs"], post);

/**
   - for a given list of posts and a specific post,
   - find all posts related to this specific post,
   - by reading the `relatedSlugs` on the post
*/
const relatedPosts = (posts, post) => {
  const postRelatedSlugs = relatedSlugs(post)
  return R.filter(p => R.contains(p.data.slug, postRelatedSlugs), posts);
}

const injectRelatedPosts = posts => post =>
      R.assocPath(["data", "relatedPosts"], relatedPosts(posts, post), post);

// todo: Test
const rawDataToGetData = post => {
  // this has to be a constant to prevent it from being passed as a value
  // which causes a problem when data is stripped
  const postDataCopy = R.clone(post.data)
  return R.assoc("getData", () => postDataCopy, post);
}

const stripPostContents = post => R.dissocPath(["data", "contents"], post);

// todo: Test
const stripRelatedPostsContent = post =>
      R.assocPath(["data", "relatedPosts"],
		  R.map(stripPostContents, post.data.relatedPosts),
		  post);

const stripRelatedPosts = post => R.dissocPath(["data","relatedPosts"], post);

/**
   - take an initial value of postPages and
   - transform it to the required form
 */
const transformPostPages = postPages => post => {
  // R.compose works right to left, i.e.
  // the last fn will be applied first, followed by second last until first
  const transform = R.compose(
    rawDataToGetData,
    stripRelatedPostsContent,
    injectRelatedPosts(postPages),
  );

  return transform(post);
}

const sortByPublishDateDesc = (postPages) => {
  const dateDiff = (a, b) => {
    return new Date(b.data.publishedOn).getTime() - new Date(a.data.publishedOn).getTime()
  }

  return R.sort(dateDiff, postPages);
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
    const sortedPostPages = sortByPublishDateDesc(postPages);

    const allPosts = R.map(
      R.compose(stripPostContents, stripRelatedPosts),
      sortedPostPages);
    const featuredPosts = R.filter(p => p.data.featured, allPosts);
    const latestPosts = R.take(5, allPosts);

    const sitePages = getSitePages(content);
    return [{
      path: '/',
      template: 'src/templates/Landing',
      getData: () => ({featuredPosts, latestPosts})
    }, {
      path: '/blog',
      template: 'src/templates/Blog',
      getData: () => ({allPosts, featuredPosts})
    },
    ...postPages,
    ...sitePages];
  }
}

export {contentDir, isPublished, relatedSlugs, relatedPosts, injectRelatedPosts, postsToPostPages}
