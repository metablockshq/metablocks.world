import React from 'react';
import {useRouteData, Head} from 'react-static';
import {Link} from 'react-router-dom';

import LayeredContainer from '../components/LayeredContainer';
import PostCard from '../components/PostCard';
import str from '../utils/string';
import colors from '../utils/colors';

const Blog = () => {
  const {allPosts, featuredPosts} = useRouteData();
  return (<LayeredContainer>
    <Head>
      <title>Krim. / Blog</title>
    </Head>
    <div className="white w-90 w-90-m w-50-l center mt4 flex">
      <div className="w-90 center w-70-ns pr0 pr3-ns overflow-y-scroll" style={{height: "86vh"}}>
        <div className="ttu f7 b mb3">Latest</div>
        {allPosts.map((p, i) => <PostCard key={i} post={p} />)}
      </div>
      <div className="dn dib-ns w-30 pl3">
        <div className="ttu f7 b mb3">Featured Posts</div>
        {featuredPosts.map((p, i) => <PostCard key={i} post={p} small />)}
      </div>
    </div>
  </LayeredContainer>);
};

export default Blog;