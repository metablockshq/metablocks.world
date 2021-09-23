import React, {Component, useEffect} from 'react';
import {Root, Routes, Head} from 'react-static';
import {Route, Switch} from 'react-router-dom';
;
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
	    <React.Suspense fallback={<Loading />}>
	      <Switch>
		<Route component={Routes} />
	      </Switch>
	    </React.Suspense>
	  </Root>)
};

export default App;
