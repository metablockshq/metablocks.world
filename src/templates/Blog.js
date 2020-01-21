import React from 'react';
import {useRouteData, Head} from 'react-static';
import {Link} from 'react-router-dom';

import LayeredContainer from '../components/LayeredContainer';

const dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};

const PostCard = ({post}) => {
  return (<div className="mb4 ba pa2 br2 b--white-10">
    <Link to={post.path} className="">
      <div className="f6">{(new Date(post.publishedOn)).toLocaleDateString('en-us', dateOptions)}</div>
      {post.heroImg && <div className="h5 w-100 bg-blue mt2 br2 bg-center cover" style={{background: `url(${post.heroImg})`}}/>}
      <div className="f4 mt2">{post.title}</div>
      {post.subTitle && <div className="f5 mt1 white-80">{post.subTitle}</div>}
      <div className="f7 white-80 mt2">{post.tags.join(', ')}</div>
    </Link>
  </div>);
};

const Blog = () => {
  const {postList} = useRouteData();
  return (<LayeredContainer>
    <Head>
      <title>Krim. / Blog</title>
    </Head>
    <div className="white pa3 w-90 w-80-m w-50-l center mt4 overflow-y-scroll">
      {postList.map((p, i) => <PostCard key={i} post={p} />)}
    </div>
  </LayeredContainer>);
};

export default Blog;