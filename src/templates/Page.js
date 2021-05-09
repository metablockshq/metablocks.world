import React from 'react';
import {useRouteData, Head} from 'react-static';
import convert from 'htmr';

import Shell from '../components/Shell';
import Markdown from '../components/Markdown';
import colors from '../utils/colors';

const Page = () => {
  const {contents, title, heroImg} = useRouteData();

  return (<React.Fragment>
	    <Head>
	      <title>Krim. / {title}</title>
	      <meta name="robots" content="index, follow" />
	    </Head>

	    <Shell>
	      {title &&
	       <div className="ttu f6 b tc pv2 w-100 bg-top">
		 {title}
	       </div>}
	      <div className="pt5">
		<Markdown contents={contents} />
	      </div>
	    </Shell>
	  </React.Fragment>);
};

export default Page;
