import path from 'path';
import jdown from 'jdown';
import {rebuildRoutes} from 'react-static/node';
import chokidar from 'chokidar';
import {paramCase} from 'change-case';
import R from 'ramda';


const contentDir = './src/content';

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

const commaSeperatedToArray = str => str ? R.split(', ', str) : [];

const getProcessedPosts = (content) => {
  const convertTagsAndRelatedPostsToArray = obj => R.mapObjIndexed(
    (val, key, obj) => (key === 'tags' || key === 'relatedSlugs') ? commaSeperatedToArray(val) : val, 
    obj);

  const injectSlugFn = slug => obj => R.assoc('slug', slug, obj);

  const isPublished = (post) => post.publishedOn !== null;
  const publishedPosts = R.filter(isPublished, content.posts);

  const processedPostsObj = R.mapObjIndexed((val, key, obj) => {
    const slug = val.slug || paramCase(key);
    const transform = R.compose(convertTagsAndRelatedPostsToArray, injectSlugFn(slug));

    return {
      path: `/blog/${slug}`,
      template: 'src/templates/blog/Post',
      data: transform(val)
    }
  }, publishedPosts);

  return R.values(processedPostsObj);
};

const getPostPages = (processedPosts) => {
  const relatedSlugs = data => R.pathOr([], ['relatedSlugs'], data);
  const postBySlug = slug => R.dissocPath(['data', 'contents'], R.find(p => p.data.slug === slug, processedPosts));
  const relatedPosts = data => R.map(postBySlug, relatedSlugs(data));
  const injectRelatedPosts = data => R.assoc('relatedPosts', relatedPosts(data), data);

  return R.map(({path, template, data}) => ({
    path,
    template,
    // assoc related posts to data
    getData: () => injectRelatedPosts(data)
  }), processedPosts)
};

const getBlogPosts = (processedPosts) => {
  const stripContents = post => R.dissocPath(['data', 'contents'], post);
  const withoutContent = R.map(stripContents, processedPosts);
  const byPublishedOnDesc = R.comparator((a, b) => {
    return a.data.publishedOn > b.data.publishedOn;
  });

  return R.sort(byPublishedOnDesc, withoutContent);
}

export default {
  siteRoot: 'https://krimlabs.com',
  plugins: [
    'react-static-plugin-react-router',
    'react-static-plugin-sitemap'
  ],
  getRoutes: async () => {
    const content = await jdown(contentDir);

    const processedPosts = getProcessedPosts(content);

    const postPages = getPostPages(processedPosts);
    const allPosts = getBlogPosts(processedPosts);

    const featuredPosts = R.filter(p => p.data.featured, allPosts);
    const latestPosts = R.take(3, allPosts);

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
