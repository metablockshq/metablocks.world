import React from "react";
import {Link} from "react-router-dom";

import str from "../utils/string";
import img from "../utils/image";
import "./postCard.css"

const AuthorBar = ({author, publishedOn}) => {
  const optimizedPaths = img.getOptimizedPaths(author.profilePicture)
  return (<div className="flex flex-column flex-row-m flex-row-l justify-between items-center bt b--black-20 ph3 ph4-l mt2 mt3-ns pb2 pt0 pt1-ns f7 f6-l">
	    <div className="flex flex-column flex-row-m flex-row-l items-center">
	      <img src={optimizedPaths.w80}
		   className="br-100 mt1 dn dib-ns"
		   alt={author.name}
		   style={{height: 28,
			   width: 28}}
	      />
	      <span className="pl1 pl2-l mt2 mt0-m mt0-l">By {author.name}</span>
	    </div>
	    <div className="black-80">
	      {str.humanReadableDate(publishedOn)}
	    </div>
	  </div>)
}

const stackClass = (additional) => `br4 br--top h1 bg-white center ${additional}`
const stackStyle = {boxShadow: "0 2px 7px 0 rgba(0, 0, 0, 0.3)"}
const Stack = () =>
      (<div className="w-100">
	 <div className={stackClass("w-80")} style={stackStyle} />
	 <div className={stackClass("w-90")} style={stackStyle} />
       </div>)

const PostCard = ({post, leftTopTitle, stacked, containerClass}) => {
  const {title, subTitle, heroImg, tags, publishedOn, author, featured} = post.data;
  const computedLeftTopTitle = featured && "featured"
  return (<Link to={post.path} className="">
	    {stacked && <Stack />}
	    <div className={`flex flex-column bg-white br4 postCard ${containerClass}`}
		 style={{boxShadow: "0 2px 7px 0 rgba(0, 0, 0, 0.3)"}}
	    >
	      <div className="tl ttu f7 b black-40 ph3 ph4-ns pt2">
		{leftTopTitle || computedLeftTopTitle}
	      </div>
	      <div className={`flex items-center pt2 ph3 ph4-ns ${featured && "flex-column"}`}>
		<div className={featured ? "mb2 mb3-ns w-100" : "normalPostFlexBasis"}
		     style={featured ? {minHeight: "10rem"} : {}}>
		  {heroImg && <div className={`${featured ? "": "cover"}`}>
                                <img
				  loading="lazy"
				  className={!featured ? "cover" : ""}
				  srcSet={img.getSrcSet(heroImg)}
				  src={img.getOgSrc(heroImg)}
				  alt={`${title} - cover image`} />
				</div>}
		</div>
		<div className={`pl3 tl f6 f5-m f4-l ${featured && "tc"}`}>
		  <div className="b">{title}</div>
		  {subTitle && <div className="mt1 black-80">{subTitle}</div>}
		</div>
	      </div>
	      {author.name && <AuthorBar author={author} publishedOn={publishedOn} />}
	    </div>
	  </Link>)
}

export default PostCard;
