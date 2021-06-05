import React from 'react';
import {useRouteData} from 'react-static';
import convert from 'htmr';

import Shell from '../components/Shell';
import SEO from '../components/SEO';
import Markdown from '../components/Markdown';
import colors from '../utils/colors';

const Page = () => {
  const {contents, title, heroImg} = useRouteData();

  return (<React.Fragment>
	    <SEO title={`Krim / ${title}`} />
	    <Shell>
	      {title &&
	       <div className="ttu f6 b tc pv4 w-100 bg-top">
		 {title}
	       </div>}
	      <div className="pt5">
		<Markdown contents={contents} />
	      </div>
	    </Shell>
	  </React.Fragment>);
};

export default Page;
