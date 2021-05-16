import React, {useEffect} from "react";
import {useRouteData, Head} from "react-static";
import {Link, useLocation} from "react-router-dom";
import convert from "htmr";
import {parse} from "tldts";

import colors from "../../utils/colors";
import Shell from "../../components/Shell";
import Nav from "../../components/Nav";
import PostCard from "../../components/PostCard";
import str from "../../utils/string";
import img from "../../utils/image";
import plant from "../../images/plant.png";
import fbIcon from "../../images/icons/fb.svg";
import twitterIcon from "../../images/icons/twitter.svg";
import Markdown from "../../components/Markdown";

const Related = ({relatedPosts}) => {
  return (<div>
	    <div className="f6 ttu b pt2 mt4">Related Posts</div>
	    <div className="flex flex-wrap justify-between mt3">
	      {relatedPosts.map(p => <div key={p.data.slug} className="w-100 w-30-ns">
				       <PostCard post={p} small={true}/>
				     </div>)}
	    </div>
	  </div>);
}

const Follow = () => {
  return (<div className="mt3 mb5">
	    <div className="ba br2 bw2 b--white flex pt0 pt1-m pt3-l pl2 pl3-ns">
	      <div className="flex items-end nb2" style={{flex: 1}}>
		<img src={plant} />
	      </div>
	      <div className="pa3 f4 f3-ns" style={{flex: 3}}>
		<div className="f5 mb2">If you liked this post and want to stay updated, you can follow Shivek Khurana on:</div>
		<div>
		  <a className="underline" href="https://twitter.com/shivek_khurana">Twitter</a>, <a className="underline" href="https://github.com/shivekkhurana">Github</a> or <a className="underline" href="https://airtable.com/shrvdZbevPVW8fhRP">Mailing List</a>
		</div>
	      </div>
	    </div>
	    <div className="mt2 f7 o-30">
	      Plant image illustration designed by <a href="http://www.freepik.com">rawpixel.com at Freepik</a>
	    </div>
	  </div>);
};

const shareUrls = {
  twitter: (link='', message='') =>
  `https://twitter.com/intent/tweet/?text=${encodeURIComponent(message)}&url=${encodeURIComponent(link)}`,
  facebook: (link='') =>
  `https://facebook.com/sharer/sharer.php?u=${link}`,
  linkedin: (link='', message='') =>
  `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(link)}
    &title=${encodeURIComponent(message)}&summary=${encodeURIComponent(message)}&source=${encodeURIComponent(link)}`,
  mail: (link='', subject, body) =>
  `mailto:?subject=${encodeURIComponent(subject || '')}&body=${encodeURIComponent((body && `${body}\n\n${link}`) || link)}`,
  whatsapp: (link='', message='') =>
  `whatsapp://send?text=${encodeURIComponent(message)}%20${encodeURIComponent(link)}`,
  telegram: (link='', message='') =>
  `https://telegram.me/share/url?text=${encodeURIComponent(message)}&url=${encodeURIComponent(link)}`,
  hn: (link='', message='') =>
  `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(link)}&t=${encodeURIComponent(message)}`,
};

const openAndFocus = (link) => {
  // https://stackoverflow.com/questions/4907843/open-a-url-in-a-new-tab-and-not-a-new-window

  return () => {
    const openedWin = window.open(link, "_blank");
    openedWin.focus();
  }
};

// Need this trickery because Adblock blocks links to twitter and facebook
const ShareButton = ({link, children}) =>
      (<div onClick={openAndFocus(link)} className="pointer">
	 {children}
       </div>);

const Share = ({title, url}) => {
  return (<div className="flex">
	    <ShareButton link={shareUrls.twitter(url, `${title} by @shivek_khurana`)}>
	      <img className="block" src={twitterIcon} alt=""/>
	    </ShareButton>
	  </div>);
};

const SEO = ({title, subTitle, tags, publishedOn, author, canonicalUrl, heroImg}) => {
  return (<Head>
	    {/*SEO*/}
	    <title>{title}</title>
	    <meta name="keywords" content={tags} />
	    <meta name="robots" content="index, follow" />
	    {subTitle && <meta name="description" content={subTitle} />}
	    {subTitle && <meta name="og:description" content={subTitle} />}
	    <meta property="og:title" content={title} />
	    <meta property="og:type" content="article" />
	    <meta property="article:published_time" content={publishedOn} />
	    <meta property="article:author" content={author || "Shivek Khurana"} />
	    <meta property="article:tag" content={tags} />
	    {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
	    {heroImg && heroImg.indexOf('https://') === -1 && <meta property="og:image" content={`https://krimlabs.com${heroImg}`} />}
	  </Head>);
}

const AuthorImage = ({profilePicture, name}) => {
  const optimizedPaths = img.getOptimizedPaths(profilePicture)
  return (<img src={optimizedPaths.w80}
	       className="br-100"
	       alt={name} />)
}

const Author = ({author, publishedOn}) => {
  return (<div className="flex mt4 items-center justify-between">
	    <div className="flex items-center">
	      <div className="w3">
		<AuthorImage profilePicture={author.profilePicture}
			     name={author.name}/>
	      </div>
	      <div className="pl2">
		<div className="b f6">
		  <Link className="underline" to={`/authors/${author.slug}`}>{author.name}</Link>
		</div>
		<div className="f7 mt1 bp3-text-muted mb2">{str.humanReadableDate(publishedOn)}</div>
	      </div>
	    </div>
	  </div>)
}

const Post = () => {
  const {contents, title, subTitle, heroImg, tags, publishedOn, author, canonicalUrl, relatedPosts, slug} = useRouteData();
  const {pathname} = useLocation();

  return (<Shell>

	    <SEO title={title} subTitle={subTitle} author={author} heroImg={heroImg}
		 tags={tags} publishedOn={publishedOn} canonicalUrl={canonicalUrl} />

	    <article className="mt3 pb5">
	      <div className="center w-90 w-80-m w-50-l">
		<div className="f3 f2-m f1-l b mt5">{title}</div>
		{subTitle && <div className="f2 mt1 mb2 bp3-text-muted">{subTitle}</div>}
		<Author author={author} publishedOn={publishedOn} />
		<Share title={title} url={`https://krimlabs.com/blog/${slug}`}/>
	      </div>

	      {heroImg &&
	       <div className="center w-90 w-80-m w-60-l mv4">
		 <img src={heroImg} className="br2"/>
	       </div>}

	      <Markdown contents={contents} />

	      <div className="center w-90 w-80-m w-50-l">
		<div className="f4">
		  {canonicalUrl && <div className="mt3 bg-black-10 pa2 br2 black-60">
				     This blog was originally published on <a href={canonicalUrl} className="black">{str.capitalise(parse(canonicalUrl).domainWithoutSuffix)}.</a>
				   </div>}

		  <Follow />
		  <div>
		    <div className="ttu f6 b mb3">
		      Share this post
		    </div>
		    <Share title={title} url={`https://krimlabs.com/blog/${slug}`}/>
		  </div>
		</div>
		{relatedPosts.length > 0 && <Related relatedPosts={relatedPosts} />}
	      </div>
	    </article>
	  </Shell>);
};

export default Post;
