import React from 'react';
import {Head, useRouteData} from 'react-static';

import Shell from "../components/Shell";
import colors from 'utils/colors';
import PostCard from '../components/PostCard';

const Letter = ({className}) => {
  return (<div className="" style={{backgroundColor: colors.DARK_GRAY1}}>
	    <div className={`center w-90 w-70-m w-40-l f5 f4-ns lh-copy pr0 pr0-m pr4-l georgia flex justify-between ${className}`}
		 style={{flex:1}}>

	      <div className="w-20 mt2">
		<img src="/img/brown-boy.svg" alt="Illustration of a brown boy" className="bb pl3 b--white-20"/>
	      </div>
	      <div className="w-70">
		<p className="b sans-serif o-100">Hi Stranger !</p>

		<p>My name is Shivek Khurana and <span className="i">Krim Labs is a canopy for my consultancy, products and ideas</span>.</p>

	      </div>
	    </div>
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
  return (<Shell>
   	    <Meta />
   	    <div className="center">
   	      <Letter className="pt3"/>
   	      <div className="w-90 w-70-ns center flex mt4 mt4-m mt0-l pa0 pa0-m pa4-l" style={{flex: 1}}>
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
   	  </Shell>);
};

export default Landing;
