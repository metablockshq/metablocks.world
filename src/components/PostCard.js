import React from 'react';
import {Link} from 'react-router-dom';

import str from '../utils/string';

const PostCard = ({post, small}) => {
  const {title, heroImg, subTitle, tags, publishedOn} = post.data;
  return (<div className="mb4">
    <Link to={post.path} className="">
      <div className={`${small ? 'f7' : 'f6'}`}>{str.humanReadableDate(publishedOn)}</div>
      {heroImg && <img className="mt2 br2 shadow-1" src={heroImg} alt={`${title} - cover`}/>}
      <div className={`mv2 ${small ? 'f4' : 'f3'}`}>{title}</div>
      {subTitle && <div className={`mt1 mb3 o-80 ${small ? 'f5' : 'f4'}`}>{subTitle}</div>}
      {!small && <div className="f7 white-80 mt2">{tags.join(', ')}</div>}
    </Link>
  </div>);
};

export default PostCard;