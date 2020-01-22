import React from 'react';
import {useRouteData, Head} from 'react-static';
import convert from 'htmr';

import LayeredContainer from '../components/LayeredContainer';
import colors from '../utils/colors';

const Page = () => {
  const {contents, title, heroImg} = useRouteData();

  return (<LayeredContainer>
    <Head>
      <title>Krim. / {title}</title>
      <meta name="robots" content="index, follow" />
    </Head>
    {title && <div 
      className="ttu f6 b tc white pv2 w-100 bg-top" 
      style={{ backgroundColor: colors.DARK_GRAY3}}
    >
      {title}
    </div>}
    <div className="white w-90 w-80-m w-40-ns lh-copy center mt5 markdown">
      {contents && convert(contents)}
    </div>
  </LayeredContainer>);
};

export default Page;