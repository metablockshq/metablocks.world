import path from 'path';
import jdown from 'jdown';
import {rebuildRoutes} from 'react-static/node'

const docsDir = 'src/docs';

const docRoutes = docsContent => Object.keys(docsContent).map(parentKey => {
  return Object.keys(docsContent[parentKey]).map(childKey => {
    const parent = docsContent[parentKey];
    const child = docsContent[parentKey][childKey];
    return {
      path: `${parentKey}/${child.slug}`,
      template: 'src/templates/Docs',
      getData: () => ({docsContent, doc: child})
    }
  })
}).reduce((acc, next) => ([...acc, ...next]), []);

export default {
  plugins: [
    'react-static-plugin-react-router',
    [require.resolve('react-static-plugin-source-filesystem'), {
      location: 'src/pages'
    }]
  ],
  getRoutes: async () => {
    const docsContent = await jdown(docsDir);

    return [{
      path: '/docs',
      template: 'src/templates/Docs',
      getData: () => ({}),
      children: docRoutes(docsContent)
    }];
  }
}
