import path from 'path';
import jdown from 'jdown';
import {rebuildRoutes} from 'react-static/node';
import chokidar from 'chokidar';
import {paramCase} from 'change-case';
import R from 'ramda';

// chokidari keval dev mode main
if (process.env.REACT_STATIC_ENV === 'development') {
  chokidar.watch(contentDir).on('all', () => {
    try {rebuildRoutes()} 
    catch(e) {
      // it's okay
    }
  });
}

const contentDir = './src/content';

const isPublished = (post) => post.publishedOn !== null;

// individual post page
const postPages = (content) => Object.keys(content.posts)
  .filter(k => isPublished(content.posts[k]))
  .map(k => ({
    path: content.posts[k].slug || `${paramCase(k)}`,
    template: 'src/templates/blog/Post',
    getData: () => content.posts[k]
  }))
;

// individual site page
const sitePages = (content) => Object.keys(content.pages).map(k => ({
  path: `/${k}`,
  template: 'src/templates/Page',
  getData: () => content.pages[k]
}));

// cumulative list for /blog
const postList = (content) => {
  const byPublishedOnDesc = R.comparator((a, b) => a.publishedOn > b.publishedOn);
  const pickRequiredKeys = (obj) => R.pick(['title', 'subTitle', 'heroImg', 'publishedOn', 'tags', 'slug', 'featured'], obj);
  const convertTagsToArray = (obj) => R.mapObjIndexed((val, key, obj) => key !== 'tags' ? val : R.split(', ', val), obj);

  const list = Object.keys(content.posts)
    .filter(k => isPublished(content.posts[k]))
    .map(k => ({
      path: `/blog/${content.posts[k].slug || paramCase(k)}`,
      ...R.compose(convertTagsToArray, pickRequiredKeys)(content.posts[k])
    }))
  ;

  // reuturn after sorting by publish date
  return R.sort(byPublishedOnDesc, list);
}

export default {
  siteRoot: 'https://krimlabs.com',
  plugins: [
    'react-static-plugin-react-router',
    'react-static-plugin-sitemap'
  ],
  getRoutes: async () => {
    const content = await jdown(contentDir);

    return [{
      path: '/', 
      template: 'src/templates/Landing'
    }, {
      path: '/blog', 
      template: 'src/templates/Blog',
      getData: () => ({postList: postList(content)}),
      children: postPages(content)
    }, 
    ...sitePages(content)];
  }
}
