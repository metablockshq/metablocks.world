import React, {useEffect} from 'react';
import {useRouteData, Head} from 'react-static';
import {Link, useLocation} from 'react-router-dom';
import convert from 'htmr';

import LayeredContainer from '../../components/LayeredContainer';
import PostCard from '../../components/PostCard';
import str from '../../utils/string';
import plant from '../../images/plant.png';
import Markdown from '../../components/Markdown';

const Related = ({relatedPosts}) => {
  return (<div>
    <div className="f6 ttu b pt2">Related Posts</div>
    <div className="flex flex-wrap justify-between mt4">
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
        <div className="ttu f7 b mb2">Keep in touch</div>
        <div>
          Follow Shivek Khurana on <a className="underline" href="https://twitter.com/shivek_khurana">Twitter</a> or <a className="underline" href="https://github.com/shivekkhurana">Github</a>  
        </div>
      </div>
    </div>
    <div className="mt2 f7 o-30">
      Plant image illustration designed by <a href="http://www.freepik.com">rawpixel.com at Freepik</a>
    </div>
  </div>);
}

const transform = {
  p: ({children}) => <p className="georgia">{children}</p>,
  li: ({children}) => <li className="georgia mb3">{children}</li>,
  blockquote: ({children}) => <blockquote className="georgia i f3">{children}</blockquote>,
  a: ({href, children}) => <a href={href} target="_blank">{children}</a>,
  img: ({src, alt}) => <img src={src} className="" alt={String(alt)}/>
}


const Post = () => {
  const {contents, title, subTitle, heroImg, tags, publishedOn, author, canonicalUrl, relatedPosts} = useRouteData();
  const {pathname} = useLocation();

  useEffect(() => {
    // this id is defined in LayerdContainer Component
    const lc = document.getElementById('layeredContainerScrollDiv');
    lc.scrollTop = 0;
  }, [pathname]);

  return (<LayeredContainer level={1}>
    <Head>
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

      <div className="center w-90 w-80-m w-50-l">
        <div className="f4">
          <Markdown contents={contents} />

          {canonicalUrl && <div className="mt3 bg-white-10 pa2 br2 o-50">
            This blog was originally published on <a href={canonicalUrl}>Medium</a>
          </div>}

          <Follow />
        </div>
        {relatedPosts.length > 0 && <Related relatedPosts={relatedPosts} />}
      </div>
    </div>
  </LayeredContainer>);
};

export default Post;