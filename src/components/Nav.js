import React, {useState} from "react";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import Dropdown from "react-dropdown";

import telephone from "../images/emoji/telephone.png";
import writingHand from "../images/emoji/writing-hand.png";
import raisedHands from "../images/emoji/raised-hands.png";
import robot from "../images/emoji/robot.png";
import bankNote from "../images/emoji/dollar-banknote.png"
import book from "../images/emoji/books.png"
import womanRaisingHand from "../images/emoji/woman-raising-hand-medium-light-skin-tone.png"
import speechBalloon from "../images/emoji/speech-balloon.png"

import colors from "../utils/colors.js";

const baseLinks = [{
  label: "Blog",
  to: "/blog",
  icon: writingHand,
  activeClassName: "b--black-80"
}, {
  label: "Contact",
  to: "/contact",
  icon: telephone,
  activeClassName: "b--black-80"
}, {
  label: "Clojure Course",
  to: "/courses/tinycanva-clojure-for-react-developers",
  icon: book,
  activeClassName: "b--black-80"
}];

const NavItem = ({l}) => {
  return (<div className="flex items-center">
	    <div className="pt1 black-90">
	      <img src={l.icon} className="mr1" style={{height: 20, width: 20}}/>
	    </div>
	    <div className="">{l.label}</div>
	  </div>);
};

const scrollToId = id => () => {
  if (window && document) {
    const $el = document.getElementById(id.substring(1))
    window.scrollTo({left: 0,
		     top: $el.offsetTop - 80,
		     behaviour: "smooth"})
  }
}

const BaseNav = ({backgroundColor, leftItem, links}) => {
  const {pathname} = useLocation();
  const history = useHistory();

  return (<nav className="fixed w-100 z-1 db">
	    <div className="flex pv2 ph2 ph4-ns justify-between items-center"
		 style={{backgroundColor: backgroundColor || "rgba(255, 255, 255, 0.5)",
			 backdropFilter: "saturate(180%) blur(5px)"}}>
	      {leftItem}
	      <div className="dn dn-m flex-ns justify-end">
		{links.map(l => (<NavLink key={l.label}
					  activeClassName={l.activeClassName}
					  className={"ml4 bb bw2 b--white-05"}
					  to={l.to}
					  onClick={l.to.startsWith("#") ? scrollToId(l.to) : () => {}}
				 >
				   <NavItem l={l} />
				 </NavLink>))}
	      </div>

	      <div className="flex dn-l">
		<Dropdown
		  options={links.map(l => ({...l, className: "mv3", value: l.to}))}
		  placeholder="• • •"
		  placeholderClassName="db pointer mr3 mr0-ns"
		  menuClassName="fixed right-0 mr3 pl3 pr4 white bg-black br3 mt2"
		  onChange={selected => {
		    history.push(selected.value)
		    if (selected.value.startsWith("#")) scrollToId(selected.value)();
		  }}
		/>
	      </div>
	    </div>
	  </nav>);
};

const BaseLeftItem = () =>
      (<NavLink to="/" className="b dib">
	 Krim Labs
       </NavLink>)

const Nav = () =>
      (<BaseNav
	 backgroundColor="rgba(255, 255, 255, 0.5)"
	 links={baseLinks}
	 leftItem={<BaseLeftItem />}
       />)

const TinycanvaLeftItem = () =>
      (<div className="flex">
	 <div className="white-70 mr2">
	   <BaseLeftItem />
	 </div>
	 /
	 <NavLink to="/courses/tinycanva-clojure-for-react-developers"
		  className="ml2 white b">
	   Tinycanva
	 </NavLink>
       </div>)

const tinycanvaLinks = [{
  label: "FAQs",
  to: "#faq",
  icon: womanRaisingHand,
  activeClassName: ""
}, {
  label: "Pricing",
  to: "#pricing",
  icon: bankNote,
  activeClassName: ""
}, /* {
  label: "Testimonies",
  to: "#testimonies",
  icon: speechBalloon,
  activeClassName: ""
}*/];

const TinycanvaNav = () =>
      (<BaseNav
	 backgroundColor="rgba(27, 27, 27, 0.5)"
	 links={tinycanvaLinks}
	 leftItem={<TinycanvaLeftItem />}
       />)

export default Nav;
export {TinycanvaNav}
