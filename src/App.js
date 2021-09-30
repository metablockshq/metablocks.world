import React, {Component, useEffect} from 'react';
import {Root, Routes, Head} from 'react-static';
import {Route, Switch} from 'react-router-dom';

import SEO from "./components/SEO"
import {SolanaProviders} from "./components/SolanaWallet"

import './tachyons.min.css';
import './app.css'

const Loading = () => {
  // loading can be more juicy
  return (<div></div>)
};

const Favicons = () =>
      (<Head>
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
       </Head>)

const App = () => {
  return (<Root>
	    <SolanaProviders>
	      <Favicons />
	      <SEO
		title="Meta Blocks - NFT Evolution Protocol"
		subTitle="Meta Blocks is an NFT Evolution Protocol that lets you build up your NFTs, buy accessories that you like and trade them on secondary marketplaces."
		heroImg="/img/genft/og.png"
		tags="meta blocks, meta blocks world, solana, ignition hackathon, nfts, nft evolution"
	      />

	      <React.Suspense fallback={<Loading />}>
		<Switch>
		  <Route component={Routes} />
		</Switch>
	      </React.Suspense>
	    </SolanaProviders>
	  </Root>)
};

export default App;
