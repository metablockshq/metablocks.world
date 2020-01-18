

import React from 'react'
import universal, { setHasBabelPlugin } from '/Users/shivekkhurana/WIP/Krim/eiphop.js.org/node_modules/react-universal-component/dist/index.js'

setHasBabelPlugin()

const universalOptions = {
  loading: () => null,
  error: props => {
    console.error(props.error);
    return <div>An error occurred loading this page's template. More information is available in the console.</div>;
  },
  ignoreBabelRename: true
}

const t_0 = universal(import('/Users/shivekkhurana/WIP/Krim/eiphop.js.org/node_modules/react-static/lib/browser/components/Default404'), universalOptions)
      t_0.template = '/Users/shivekkhurana/WIP/Krim/eiphop.js.org/node_modules/react-static/lib/browser/components/Default404'
      
const t_1 = universal(import('/Users/shivekkhurana/WIP/Krim/eiphop.js.org/src/pages/index.js'), universalOptions)
      t_1.template = '/Users/shivekkhurana/WIP/Krim/eiphop.js.org/src/pages/index.js'
      
const t_2 = universal(import('/Users/shivekkhurana/WIP/Krim/eiphop.js.org/src/pages/license.js'), universalOptions)
      t_2.template = '/Users/shivekkhurana/WIP/Krim/eiphop.js.org/src/pages/license.js'
      
const t_3 = universal(import('/Users/shivekkhurana/WIP/Krim/eiphop.js.org/src/templates/Docs'), universalOptions)
      t_3.template = '/Users/shivekkhurana/WIP/Krim/eiphop.js.org/src/templates/Docs'
      

// Template Map
export default {
  '/Users/shivekkhurana/WIP/Krim/eiphop.js.org/node_modules/react-static/lib/browser/components/Default404': t_0,
'/Users/shivekkhurana/WIP/Krim/eiphop.js.org/src/pages/index.js': t_1,
'/Users/shivekkhurana/WIP/Krim/eiphop.js.org/src/pages/license.js': t_2,
'/Users/shivekkhurana/WIP/Krim/eiphop.js.org/src/templates/Docs': t_3
}
// Not Found Template
export const notFoundTemplate = "/Users/shivekkhurana/WIP/Krim/eiphop.js.org/node_modules/react-static/lib/browser/components/Default404"

