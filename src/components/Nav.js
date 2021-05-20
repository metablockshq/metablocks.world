import React, {useState} from "react";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import Dropdown from "react-dropdown";
import Headroom from "react-headroom";

import telephone from "../images/emoji/telephone.png";
import writingHand from "../images/emoji/writing-hand.png";
import raisedHands from "../images/emoji/raised-hands.png";
import robot from "../images/emoji/robot.png";
import colors from "../utils/colors.js";

const links = [/*{
  label: "About",
  path: "/about",
  icon: raisedHands
},*/ {
  label: "Blog",
  path: "/blog",
  icon: writingHand
}, {
  label: "Contact",
  path: "/contact",
  icon: telephone
}, /*{
  label: "People",
  path: "/people",
  icon: robot
}*/];

const activeClassName = "b--black-80";

const NavItem = ({l}) => {
  return (<div className="flex items-center">
	    <div className="pt1 black-90">
	      <img src={l.icon} className="mr1" style={{height: 20, width: 20}}/>
	    </div>
	    <div className="">{l.label}</div>
	  </div>);
};

const Nav = () => {
  const {pathname} = useLocation();
  const history = useHistory();

  return (<div className="fixed w-100">
	    <div className="black flex pv2 ph2 ph4-ns justify-between items-center"
		 style={{background: "rgba(255, 255, 255, 0.5)",
			 backdropFilter: "saturate(180%) blur(5px)"}}>
	      <div className="">
		<NavLink to="/" className="b">
		  Krim Labs
		</NavLink>
	      </div>

	      <div className="dn flex-ns justify-end">
		{links.map(l => (<NavLink key={l.label}
					  activeClassName={activeClassName}
					  className={"ml4 bb bw2 b--white-05"}
					  to={l.path}
				 >
				   <NavItem l={l} />
				 </NavLink>))}
	      </div>

	      <div className="flex dn-ns black">
		<Dropdown
		  options={links.map(l => ({...l, className: "mv3", value: l.path}))}
		  placeholder="• • •"
		  placeholderClassName="db pointer mr3"
		  menuClassName="fixed right-0 mr3 pl3 pr4 white bg-black br3 mt2"
		  onChange={selected => history.push(selected.value)}
		/>
	      </div>
	    </div>
	  </div>);
};

export default Nav;
