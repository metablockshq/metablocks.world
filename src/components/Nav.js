import React from 'react';
import {Link} from 'react-router-dom';

import homePng from '../images/home.png';

const GithubBadges = ({className}) => {
  return (<div className={`justify-center pt2 ${className}`}>
    <div className="ph2">
      <a href="https://github.com/krimlabs/eiphop">
        <img src="https://img.shields.io/github/stars/krimlabs/eiphop?style=social" alt=""/>
      </a>
    </div>
    <div className="ph2">
      <a href="https://github.com/krimlabs/eiphop/network/members">
        <img src="https://img.shields.io/github/forks/krimlabs/eiphop?style=social" alt=""/>
      </a>
    </div>
    <div className="ph2">
      <a href="https://github.com/krimlabs/eiphop/issues">
        <img src="https://img.shields.io/github/issues/krimlabs/eiphop?style=social" alt=""/>
      </a>
    </div>
  </div>);
};

const Nav = ({showHome}) => {
  return (<div className="flex ph2 justify-between white items-center" style={{height: 28}}>
      {showHome ? 
        <div className="ttu f7 b">
          <Link to="/"><img src={homePng} style={{height: 12}} className="mr1"/>Eiphop</Link>
        </div> :
        <div className="ttu f7 b o-80">
          <a href="https://krimlabs.com">Made by Krim Labs</a>
        </div>
      }
      <GithubBadges className="flex-ns dn"/>
  </div>);
};

export default Nav;