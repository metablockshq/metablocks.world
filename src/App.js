import React, {Component} from 'react';
import {Root, Routes, Head} from 'react-static';
import {Route, Switch} from 'react-router-dom';

import './app.css';
import colors from './utils/colors';
import {MobileNav} from './components/Nav';
import useScript from './utils/hooks/useScript';
import './tachyons.min.css';

const Loading = () => {
  return (<div className="vh-100 w-100 white-20" style={{background: colors.DARK_GRAY1}}>
  </div>)
};

const App = () => {
  return (<Root>
    <Head>
      <script>var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(101233643);</script>
      <script async src="https://static.getclicky.com/js"></script>
    </Head>
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route component={Routes} />
      </Switch>
    </React.Suspense>
  </Root>)
};

export default App;
