import React, {Component} from 'react';
import {Root, Routes} from 'react-static';
import {Route} from 'react-router-dom';

import './app.css';
import colors from './utils/colors';
import {MobileNav} from './components/Nav';
import './tachyons.min.css';

const Loading = () => {
  return (<div className="vh-100 w-100 white-20" style={{background: colors.DARK_GRAY1}}>
  </div>)
};

const App = () => {
  return (<Root>
    <React.Suspense fallback={<Loading />}>
      <Route exact path="/mobile-nav" component={MobileNav} />
      <Route render={() => <Routes />} />
    </React.Suspense>
  </Root>)
};

export default App;
