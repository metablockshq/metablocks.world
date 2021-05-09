import React, {useState} from "react";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import Dropdown from "react-dropdown";
import Headroom from "react-headroom";

import logo from "../images/logo-white-with-wolf.svg";
import mailIcon from "../images/icons/mail.svg";
import briefcaseIcon from "../images/icons/briefcase.svg";
import packageIcon from "../images/icons/package.svg";
import bookIcon from "../images/icons/book-open.svg";
import colors from "../utils/colors.js";

const links = [{
  label: "Blog",
  path: "/blog",
  icon: bookIcon
}, {
  label: "Contact",
  path: "/contact",
  icon: mailIcon
}];

const activeClassName = "o-50";

const NavItem = ({l}) => {
  return (<div className="flex items-center">
	    {/*<div className="pt1 o-80">
	       <img src={l.icon} className="mr1" style={{height: 16}}/>
	       </div>*/}
	    <div className="">{l.label}</div>
	  </div>);
};

const Nav = () => {
  const {pathname} = useLocation();
  const history = useHistory();

  return (<div className="fixed w-100">
	    <div className={`white flex ph2 ph4-ns justify-between items-center`}
		 style={{background: "rgba(16, 22, 26, 0.5)",
			 backdropFilter: "saturate(180%) blur(5px)"}}>
	      <div>
		<NavLink to="/"><img className="h2 pv2" src={logo} alt="Krim Labs Logo" /></NavLink>
	      </div>

	      <div className="w-30 dn flex-ns justify-end">
		{links.map(l => (<NavLink
				   key={l.label} activeClassName={activeClassName} className={"ml3"} to={l.path}
				 >
				   <NavItem l={l} />
				 </NavLink>))}
	      </div>

	      <div className="flex dn-ns white">
		<Dropdown
		  // adds optionClassName
		  options={links.map(l => ({...l, className: "mv3", value: l.path}))}
		  placeholder="• • •"
		  placeholderClassName="db pointer mr3"
		  menuClassName="fixed right-0 mr3 ph2 bg-black br3 mt2"
		  onChange={selected => history.push(selected.value)}
		/>
	      </div>
	    </div>
	  </div>);
};

export default Nav;
