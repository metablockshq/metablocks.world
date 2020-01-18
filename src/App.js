import React, {Component} from 'react';
import {Root, Routes} from 'react-static'
import {Route, Switch} from 'react-router-dom'; 

import './app.css';
import './tachyons.min.css';

const Loading = () => {
  return (<div className="vh-100 w-100 bg-black white-20">
    Loading ...
  </div>)
}

const App = () => {
  return (<Root>
    <React.Suspense fallback={<Loading />}>
      <Route component={Routes} />
    </React.Suspense>
  </Root>)
};

export default App;
