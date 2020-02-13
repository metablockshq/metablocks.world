import React from 'react';
import {Head, useRouteData} from 'react-static';

import LayeredContainer from '../components/LayeredContainer';
import colors from 'utils/colors';
import PostCard from '../components/PostCard';

const Letter = ({className}) => {
  return (<div className={`f4 o-90 lh-copy pr0 pr0-m pr4-l georgia ${className}`} style={{flex: 1}}>
    <p className="b sans-serif o-100">Hi Stranger !</p>

    <p>My name is Shivek Khurana and Krim Labs is a canopy for my consultancy, products and ideas.</p>

    <p>Over the last 10 years, I have worked with startups, enterprises and SMEs. And have built Web Apps, Mobile Apps, NLP and Data Processing pipelines.</p>

    <p>I like working on frontends, infra, identity and backends, in that order. Clojure, React and JavaScript are my weapons of choice.</p>
 
    <p>On the spectrum of OOP and Functional Programming Paradigms, I find home on the Functional Side.</p>

    <p>Currently based in New Delhi, I’m working at <a href="https://juxt.pro" target="_blank" className="underline">Juxt</a> as a remote contractor. Juxt is a UK based Clojure Consultancy firm. My day job includes building and maintaining a set of services for a large telecom company, handling over 10 million users.</p>

  </div>);
};

const Meta = () => {
  return (<Head>
    <title>Krim Labs</title>
    <meta name="keywords" content="shivek khurana, krim labs, clojure, india, new delhi, javascript, react, shivek, krim" />
    <meta name="robots" content="index, follow" />
    <meta name="description" content="A canopy for my consultancy, products and ideas." />
    <meta property="og:url" content="https://krimlabs.com" />
    <meta property="og:description" content="A canopy for my consultancy, products and ideas." />
    <meta property="og:title" content="Krim Labs" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={`https://krimlabs.com/img/og.png`} />
  </Head>);
}

const Landing = () => {
  const {latestPosts, featuredPosts} = useRouteData();
  return (<LayeredContainer>
    <Meta />
    <div className="w-90 w-80-ns flex flex-column flex-column-m flex-row-l center white">
      <Letter className="pt3"/>
      <div className="flex mt4 mt4-m mt0-l pa0 pa0-m pa4-l" style={{flex: 1}}>
        <div className="flex flex-column pr2 pr2-m pr4-l" style={{flex: 1}}>
          <div className="ttu f7 mb3 b">Latest Posts</div>
          <div>{latestPosts.map((p, i) => <PostCard key={i} post={p} small={true} />)}</div>
        </div>     
        <div className="flex flex-column pl2 pl2-m pl4-l" style={{flex: 1}}>
          <div className="ttu f7 mb3 b">Featured Posts</div>
          <div>{featuredPosts.map((p, i) => <PostCard key={i} post={p} small={true} />)}</div>
        </div>   
      </div>
    </div>
  </LayeredContainer>);
};

export default Landing;