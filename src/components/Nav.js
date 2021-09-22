import React from "react";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import Dropdown from "react-dropdown";

import mountainFlag from "../images/genft/mountain-flag.png"
import hourGlass from "../images/genft/hour-glass.png"
import phoneChat from "../images/genft/phone-chat.png"
import moneyVault from "../images/genft/money-vault.png"
import tokenGraph from "../images/genft/token-graph.png"
import chartStats from "../images/genft/chart-stats.png"

import colors from "../utils/colors.js";
const NavItem = ({l}) => {
  return (<div className="flex items-center">
	    <div className="pt1 black-90">
	      <img src={l.icon} className="mr2" style={{height: 32}}/>
	    </div>
	    <div className="f4">{l.label}</div>
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

  return (<nav className="fixed w-90 ph3 z-1 db top-0" style={{left: "50%", transform: "translateX(-50%)"}}>
	    <div className="flex pv2 ph2 ph4-ns justify-between items-center"
		 style={{backgroundColor: backgroundColor || "rgba(0, 0, 0, 0.5)",
			 backdropFilter: "saturate(180%) blur(5px)"}}>
	      {leftItem}
	      <div className="dn dn-m flex-ns justify-end">
		{links.map(l => (<NavLink key={l.label}
					  activeClassName={l.activeClassName}
					  className={`ml4 bb bw2 b--white-05`}
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
      (<NavLink to="/" className="b f4 dib">
	 Meta Blocks
       </NavLink>)

const metaBlocksLinks = ({onConnectWalletClick}) => ([{
  label: "Use cases",
  to: "#use-cases",
  icon: mountainFlag
}, {
  label: "Timeline",
  to: "#timeline",
  icon: hourGlass
}, {
  label: "Tokenomics",
  to: "/tokenomics",
  icon: tokenGraph,
  hidden: true
}, {
  label: "Whitepaper",
  to: "/whitepaper",
  icon: chartStats,
  hidden: true
}, {
  label: "Connect wallet",
  icon: moneyVault,
  to: "/",
  onClick: onConnectWalletClick
}])


const MetaBlocksNav = ({onConnectWalletClick = () => {}}) =>
      (<BaseNav
	 backgroundColor="rgba(255, 255, 255, 0.8)"
	 links={metaBlocksLinks({onConnectWalletClick}).filter(l => !l.hidden)}
	 leftItem={<BaseLeftItem />}
       />)

export {MetaBlocksNav}
