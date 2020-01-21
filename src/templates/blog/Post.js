import React from 'react';
import {useRouteData, Head} from 'react-static';
import convert from 'htmr';

import LayeredContainer from '../../components/LayeredContainer';

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
    <div className="white w-90 w-80-m w-40-l mt3 center fromMarkdown">
      <div className="f1">{title}</div>
      <div className="lh-copy">{contents && convert(contents)}</div>
    </div>
  </LayeredContainer>);
};

export default Post;