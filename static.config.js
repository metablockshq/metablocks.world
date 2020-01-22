import path from 'path';
import jdown from 'jdown';
import {rebuildRoutes} from 'react-static/node';
import chokidar from 'chokidar';
import {paramCase} from 'change-case';
import R from 'ramda';


const contentDir = './src/content';
if (process.env.REACT_STATIC_ENV === 'development') {
  chokidar.watch(contentDir).on('all', () => {
    try {
      rebuildRoutes()
    } catch(e) {
      // it's okay
    }
  });
}

// individual post page
const postPages = (content) => Object.keys(content.posts).map(k => ({
  path: content.posts[k].slug || `${paramCase(k)}`,
  template: 'src/templates/blog/Post',
  getData: () => content.posts[k]
}));

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

  const list = Object.keys(content.posts).map(k => ({
    path: `/blog/${content.posts[k].slug || paramCase(k)}`,
    ...R.compose(convertTagsToArray, pickRequiredKeys)(content.posts[k])
  }));

  // reuturn after sorting by publish date
  return R.sort(byPublishedOnDesc, list);
}

export default {
  plugins: [
    'react-static-plugin-react-router',
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
