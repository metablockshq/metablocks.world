import React, {useState} from 'react';
import {NavLink, useLocation, useHistory} from 'react-router-dom';

import logo from '../images/logo-white-with-wolf.svg';
import LayeredContainer from '../components/LayeredContainer';
import mailIcon from '../images/icons/mail.svg';
import briefcaseIcon from '../images/icons/briefcase.svg';
import packageIcon from '../images/icons/package.svg';
import bookIcon from '../images/icons/book-open.svg';

const links = [{
  title: 'Blog',
  path: '/blog',
  position: 'left',
  icon: bookIcon
}, 
// {
//   title: 'Philosophy',
//   path: '/philosophy',
//   position: 'left' 
// }, 
{
  title: 'Clients',
  path: '/clients',
  position: 'right',
  icon: briefcaseIcon
}, {
  title: 'Services',
  path: '/services',
  position: 'right',
  icon: packageIcon
}, {
  title: 'Contact',
  path: '/contact',
  position: 'right',
  icon: mailIcon
}];

const activeClassName = "o-50";

const NavItem = ({l}) => {
  return (<div className="flex items-center">
    {/*<div className="pt1 o-80">
      <img src={l.icon} className="mr1" style={{height: 16}}/>
    </div>*/}
    <div className="">{l.title}</div>
  </div>);
};

const Nav = () => {
  const {pathname} = useLocation();
  const history = useHistory();
  const mobileAnchorLabel = pathname === "/mobile-nav" ? "✕" : "• • •";
  const onMobileAnchorClick = () => pathname === "/mobile-nav" ? history.goBack() : history.push("/mobile-nav");

  return (<div className={`flex ph2 justify-between white items-center`}>
    <div className="w-30 dn flex-ns">
      {links.filter(l => l.position === "left").map(l => (<NavLink
        key={l.title} activeClassName={activeClassName} className={"mr3"} to={l.path}
      >
        <NavItem l={l} />
      </NavLink>))}
    </div>

    <div className="w-30 dib dn-ns">
      <div onClick={onMobileAnchorClick}>{mobileAnchorLabel}</div>
    </div>

    <div>
      <NavLink to="/"><img className="h2 pv2" src={logo} alt="Krim Labs Logo" /></NavLink>
    </div>
    
    <div className="w-30 flex-ns justify-end dn">
      {links.filter(l => l.position === "right").map(l => (<NavLink
        key={l.title} activeClassName={activeClassName} className={"ml3"} to={l.path}
      >
        <NavItem l={l} />
      </NavLink>))}
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