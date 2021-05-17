import React from "react";
import {Link} from "react-router-dom";

import str from "../utils/string";
import img from "../utils/image";

const PostCard = ({post, small}) => {
  const {title, heroImg, subTitle, tags, publishedOn} = post.data;
  return (<div className="mb4 bg-black-10 br4">
	    <Link to={post.path} className="">
	      {heroImg && <img
			    loading="lazy"
			    className="br4 br--top"
			    srcSet={img.getSrcSet(heroImg)}
			    src={img.getOgSrc(heroImg)}
			    alt={`${title} - cover image`} />}
	      <div className="pa3">
		<div className={`mb2 ${small ? 'f7' : 'f6'}`}>{str.humanReadableDate(publishedOn)}</div>
		<div className={`${small ? 'f4' : 'f3'}`}>{title}</div>
		{subTitle && <div className={`mt1 mb3 o-80 ${small ? 'f5' : 'f4'}`}>{subTitle}</div>}
		{!small && <div className="f7 black-80 mt2">{tags.join(', ')}</div>}
	      </div>
	    </Link>
	  </div>);
};

export default PostCard;
