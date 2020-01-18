import React from 'react';
import {Link} from 'react-router-dom';

import Nav from '../components/Nav';
import arrowPng from '../images/arrow-right.png';

const Landing = () => {
  return (<div className="flex flex-column bg-black white vh-100">
    <Nav />
    <div className="flex-auto">
      <div className="flex w-70 center w-100-ns h-100 flex-column justify-center items-center">
        <div className="f2 f1-ns b">EIPHOP</div>
        <div className="mt1 f5">A fetch like wrapper for elecron's ipc.</div>
        <div className="flex mt5 justify-center flex flex-wrap">
          <div className="pa2 mr3 b pointer dim mb3 mb0-ns">
            <a href="https://github.com/krimlabs/eiphop/">
              Github <img className="ml1" src={arrowPng} style={{height: 12}}/>
            </a>
          </div>
          <div className="ba pv2 ph3 b--white b br2 pointer dim">
            <Link to="/docs">
              View Documentation <img className="ml1" src={arrowPng} style={{height: 12}}/>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="flex pa2 justify-end">
      <div className="f7 ttu o-80">
        <Link to="/license">Open Source under MIT LICENSE</Link>
      </div>
    </div>
  </div>)
};

export default Landing;
