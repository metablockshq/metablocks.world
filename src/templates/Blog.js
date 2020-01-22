import React from 'react';
import {useRouteData, Head} from 'react-static';
import {Link} from 'react-router-dom';

import LayeredContainer from '../components/LayeredContainer';
import str from '../utils/string';
import colors from '../utils/colors';


const PostCard = ({post}) => {
  return (<div className="mb4">
    <Link to={post.path} className="">
      <div className="f6">{str.humanReadableDate(post.publishedOn)}</div>
      {post.heroImg && <img className="mt2 br2 shadow-1" src={post.heroImg} alt={`${post.title} - cover`}/>}
      <div className="f3 mv2">{post.title}</div>
      {post.subTitle && <div className="f4 mt1 mb3 white-80">{post.subTitle}</div>}
      <div className="f7 white-80 mt2">{post.tags.join(', ')}</div>
    </Link>
  </div>);
};

const FeaturedPostCard = ({post}) => {
  return (<Link to={post.path} className="mb3 db">
    <div className="f7 o-50 mb1">{str.humanReadableDate(post.publishedOn)}</div>
    <div className="f5">{post.title}</div>
  </Link>);
};

const Blog = () => {
  const {postList} = useRouteData();
  return (<LayeredContainer>
    <Head>
      <title>Krim. / Blog</title>
    </Head>
    <div className="white w-90 w-90-m w-50-l center mt4 flex">
      <div className="w-90 center w-70-ns pr0 pr3-ns overflow-y-scroll" style={{height: "86vh"}}>
        <div className="ttu f7 b mb3">Latest</div>
        {postList.map((p, i) => <PostCard key={i} post={p} />)}
      </div>
      <div className="dn dib-ns w-30 pl2">
        <div className="ttu f7 b mb3">Top Hits</div>
        {postList.filter(p => p.featured).map((p, i) => <FeaturedPostCard key={i} post={p} />)}
      </div>
    </div>
  </LayeredContainer>);
};

export default Blog;