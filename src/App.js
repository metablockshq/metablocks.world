import React, {Component, useEffect} from 'react';
import {Root, Routes, Head} from 'react-static';
import {Route, Switch} from 'react-router-dom';

import colors from './utils/colors';
import {MobileNav} from './components/Nav';
import './tachyons.min.css';
import './app.css'

const Loading = () => {
  // loading can be more juicy
  return (<div></div>)
};

const App = () => {
  return (<Root>
	    <Head>
	      <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
	      <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
	      <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png"/>
	      <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png"/>
	      <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png"/>
	      <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png"/>
	      <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png"/>
	      <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png"/>
	      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png"/>
	      <link rel="icon" type="image/png" sizes="192x192"  href="/favicons/android-icon-192x192.png"/>
	      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
	      <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png"/>
	      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
	      <link rel="manifest" href="/favicons/manifest.json"/>
	      <meta name="msapplication-TileColor" content="#ffffff"/>
	      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
	      <meta name="theme-color" content="#ffffff"/>

	      <meta property="og:image" content="https://metablocks.world/img/genft/og.png" />
	      <meta name="robots" content="index, follow" />

	      <title>Meta Blocks - NFT Evolution Protocol</title>
	      <meta name="keywords" content="meta blocks, meta blocks world, solana, ignition hackathon, nfts, nft evolution" />
	      <meta name="robots" content="index, follow" />

	      <meta property="og:title" content={"Meta Blocks"} />
	      <meta property="og:description" content={"Meta Blocks is an NFT Evolution Protocol that lets you build up your NFTs, buy accessories that you like and trade them on secondary marketplaces."} />
	      <meta name="twitter:card" content="summary_large_image">
	    </Head>
	    <React.Suspense fallback={<Loading />}>
	      <Switch>
		<Route component={Routes} />
	      </Switch>
	    </React.Suspense>
	  </Root>)
};

export default App;
