import React from 'react';
import {NavLink} from 'react-router-dom';

import logo from '../images/logo.svg';

const className="mr3";

const Nav = ({small}) => {
  return (<div className={`flex ph2 justify-between white items-center ${small && "f6"}`}>
    <div className="w-30">
      <NavLink className={className} to="/blog">Blog</NavLink>
      {/*<NavLink className={className} to="/philosophy">Philosophy</NavLink>*/}
    </div>
    <div>
      <NavLink to="/"><img className={`${small ? "h1" : "h2"} pv2`} src={logo} alt="Krim Labs Logo" /></NavLink>
    </div>
    <div className="w-30 flex justify-end">
      <NavLink className={className} to="/clients">Clients</NavLink>
      <NavLink className={className} to="/services">Services</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </div>
  </div>);
};

export default Nav;