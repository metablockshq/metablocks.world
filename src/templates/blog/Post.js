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
    <div className="white w-90 w-80-m w-50-l mt3 center markdown">
      <div className="f6 mb2 mt4">{str.humanReadableDate(publishedOn)}</div>
      <div className="f1 b mv4">{title}</div>
      <hr/>
      <div className="b mt2 f6 white-80">By {author || "Shivek Khurana"}</div>
      <hr/>
      <div className="lh-copy f4">{contents && convert(contents)}</div>
      {canonicalUrl && <div className="mv3 bg-white-10 pa2 br2 o-50">This blog was originally published on <a href={canonicalUrl}>Medium</a></div>}

      <Follow />
    </div>
  </LayeredContainer>);
};

export default Post;