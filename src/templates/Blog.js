import React from 'react';
import {useRouteData, Head} from 'react-static';
import {Link} from 'react-router-dom';

import LayeredContainer from '../components/LayeredContainer';
import str from '../utils/string';
import colors from '../utils/colors';


const PostCard = ({post}) => {
  return (<div className="mb4 ba pa2 br2 b--white-10">
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
    <div className="white pa3 w-90 w-80-m w-50-l cf center mt4 overflow-y-scroll">
      <div className="fl w-70 pr4">
        <div className="ttu f7 b mb3">Latest</div>
        {postList.map((p, i) => <PostCard key={i} post={p} />)}
      </div>
      <div className="fl w-30">
        <div className="ttu f7 b mb3">Top Hits</div>
        {postList.filter(p => p.featured).map((p, i) => <FeaturedPostCard key={i} post={p} />)}

        {/*<div className="ttu f7 b mt4 mb3">Subscribe</div>
        <form>
          <label className="f7 o-50 mb1 dib ttu b" for="name">Full Name</label>
          <input id="name" type="text" className="white pa1 ba b--black br2 f6" style={{background: colors.BLACK}}/>

          <label className="f7 o-50 mb1 dib ttu b" for="email">Email</label>
          <input id="email" type="text" className="white pa1 ba b--black br2 f6" style={{background: colors.BLACK}}/>
        </form>*/}
      </div>
    </div>
  </LayeredContainer>);
};

export default Blog;