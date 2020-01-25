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

const getProcessedPosts = (content) => {
  const convertTagsToArray = (obj) => R.mapObjIndexed((val, key, obj) => key !== 'tags' ? val : R.split(', ', val), obj);
  const isPublished = (post) => post.publishedOn !== null;

  const publishedPosts = R.filter(isPublished, content.posts);
  const processedPostsObj = R.mapObjIndexed((val, key, obj) => ({
    path: `/${val.slug || paramCase(key)}`,
    template: 'src/templates/blog/Post',
    data: convertTagsToArray(val)
  }), publishedPosts);
  return R.values(processedPostsObj);
};

const getPostPages = (processedPosts) => {
  return R.map(({path, template, data}) => ({
    path,
    template,
    getData: () => data
  }), processedPosts)
};

const getBlogPostsData = (processedPosts) => {
  // used to render the blog post list, remove content and sort by date desc
  const withoutContent = R.map(post => R.dissocPath(['data', 'contents'], post), processedPosts);
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
    const blogPosts = getBlogPostsData(processedPosts);

    const featuredPosts = R.filter(p => p.data.featured, blogPosts);
    const latestPosts = R.take(2, blogPosts);

    const sitePages = getSitePages(content);
    

    return [{
      path: '/', 
      template: 'src/templates/Landing',
      getData: () => ({featuredPosts, latestPosts})
    }, {
      path: '/blog', 
      template: 'src/templates/Blog',
      getData: () => ({blogPosts, featuredPosts})
    },
    ...postPages,
    ...sitePages];
  }
}
