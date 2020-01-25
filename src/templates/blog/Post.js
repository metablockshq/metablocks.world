import React from 'react';
import {useRouteData, Head} from 'react-static';
import convert from 'htmr';

import LayeredContainer from '../../components/LayeredContainer';
import str from '../../utils/string';
import './post.css';
import Follow from '../../components/Follow';

const Post = () => {
  const {contents, title, subTitle, heroImg, tags, publishedOn, author, canonicalUrl} = useRouteData();

  return (<LayeredContainer level={1}>
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={tags} />
      <meta name="robots" content="index, follow" />
      {subTitle && <meta name="description" content={subTitle} />}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={publishedOn} />
      <meta property="article:author" content={author || "Shivek Khurana"} />
      <meta property="article:tag" content={tags} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {heroImg && <meta property="og:image" content={`https://krimlabs.com/${heroImg}`} />}
    </Head>
    <div className="white mt3">
      <div className="center w-90 w-80-m w-50-l">
        <div className="f6 mb2 mt4">{str.humanReadableDate(publishedOn)}</div>
        <div className="f1 b">{title}</div>
        {subTitle && <div className="f2 mt1 mb2 o-60">{subTitle}</div>}
        <div className="b mt2 f6 white-80">By {author || "Shivek Khurana"}</div>
      </div>
      
      {heroImg && <div className="center w-90 w-80-m w-60-l mv4">
        <img src={heroImg} className="br2"/>
      </div>}

      <div className="lh-copy center w-90 w-80-m w-50-l f4 markdown">
        {contents && convert(contents)}
        {canonicalUrl && <div className="mt3 bg-white-10 pa2 br2 o-50">This blog was originally published on <a href={canonicalUrl}>Medium</a></div>}
        <Follow />
      </div>      
    </div>
  </LayeredContainer>);
};

export default Post;