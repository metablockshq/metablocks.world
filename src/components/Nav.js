import React, {useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';

import logo from '../images/logo.svg';
import LayeredContainer from '../components/LayeredContainer';

const links = [{
  title: 'Blog',
  path: '/blog',
  position: 'left' 
}, 
// {
//   title: 'Philosophy',
//   path: '/philosophy',
//   position: 'left' 
// }, 
{
  title: 'Clients',
  path: '/clients',
  position: 'right' 
}, {
  title: 'Services',
  path: '/services',
  position: 'right' 
}, {
  title: 'Contact',
  path: '/contact',
  position: 'right' 
}];

const Nav = () => {
  const {pathname} = useLocation();
  const mobileAnchorLabel = pathname === "/mobile-nav" ? "✕" : "• • •";
  const mobileAnchorPath = pathname === "/mobile-nav" ? "/" : "/mobile-nav";

  return (<div className={`flex ph2 justify-between white items-center`}>
    <div className="w-30 dn dib-ns">
      {links.filter(l => l.position === "left").map(l => (<NavLink key={l.title} className={"mr3"} to={l.path}>{l.title}</NavLink>))}
    </div>
    
    <div className="w-30 dib dn-ns">
      <NavLink to={mobileAnchorPath}>{mobileAnchorLabel}</NavLink>
    </div>

    <div>
      <NavLink to="/"><img className="h2 pv2" src={logo} alt="Krim Labs Logo" /></NavLink>
    </div>
    
    <div className="w-30 flex-ns justify-end dn">
      {links.filter(l => l.position === "right").map(l => (<NavLink key={l.title} className={"ml3"} to={l.path}>{l.title}</NavLink>))}
    </div>
    <div className="w-30 dib dn-ns">
      {/*Hoax div for responsiveness purpose*/}
    </div>

  </div>);
};


export const MobileNav = () => {
  return (<LayeredContainer level={1} >
    {links.map(l => (<div key={l.title} className="f2 white pa3 mv3 tc">
      <NavLink className={""} to={l.path}>{l.title}</NavLink>
    </div>))}
  </LayeredContainer>);
}

export default Nav;