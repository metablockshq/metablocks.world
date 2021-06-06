import React from "react";
import {Link} from "react-router-dom";

import colors from "../utils/colors";
import hatMan from "../images/hat-man.svg";

const Column = ({header, links}) => {
  return (<div className="ph3 mt3 mt0-ns">
	    <div className="mb3 o-40">{header}</div>
	    {links.map((l, i) => {
	      return (<div key={`${l.label}-${i}`} className="mt2">
			{l.url.startsWith("http") ?
			 <a href={l.url} target="_blank">{l.label}</a> :
			 <Link to={l.url}>{l.label}</Link>
			}
		      </div>);
	    })}
	  </div>);
};

const socialLinks = [{
  label: "Github",
  url: "https://github.com/krimlabs"
}, {
  label: "LinkedIn",
  url: "https://www.linkedin.com/company/krimlabs"
}];

const siteLinks = [{
  label: "Blog",
  url: "/blog"
}, {
  label: "Contact",
  url: "/contact"
}, {
  label: "Clients",
  url: "/clients"
}, {
  label: "Careers",
  url: "/careers"
}, {
  label: "Philosophy",
  url: "/philosophy"
}]

const FooterLegacy = () =>
      (<div className="w-100 pv3 bg-black-20">
	 <div className="flex flex-column flex-row-ns w-90 w-70-ns center justify-between">
	   <div className="ph3">
	     <div className="mb2">Krim Labs</div>
	     <div className="o-80 f6">© 2017-2021 </div>
	     <div className="o-80 f6">All rights reserved</div>
	   </div>

	   <div className="flex">
	     <Column header="Social" links={socialLinks} />
	     <Column header="Navigation" links={siteLinks} />
	   </div>
	 </div>
       </div>)

const Meta = () =>
      (<div className="b">
	 <a href="/sitemap.xml" className="dib mr2 underline">Sitemap</a>
	 <a href="/rss.xml" className="dib mr2 underline">RSS</a>
	 <a href="/feed.json" className="dib mr2 underline">JSON Feed</a>
       </div>)

const OpenSite = () =>
      (<div className="mt3">
	 This <a href="https://github.com/krimlabs/krimlabs.com" className="underline">open-source</a> site was built with <a href="https://github.com/react-static/react-static" className="underline">React Static</a>.
       </div>)

const Netlify = () =>
      (<div className="mt1">
	 Hosting and deployment courtesy of <a href="https://netlify.com" className="underline">Netlify</a>.
       </div>)

const Freepik = () =>
      (<div className="mt1">
	 <img src={hatMan} style={{height: 20}} className="nb1" />
	 Hat man graphic made by <a href="https://www.freepik.com/free-vector/people-avatar-collection_4501741.htm" className="underline">Freepik</a>.
       </div>)

const Footer = ({attributeFreepik}) =>
      (<div className="flex flex-column flex-row-ns w-90 w-80-m w-60-ns justify-between center pv4 mt4">
	 <div>
	   <div className="o-80 f6">© 2017</div>
	   <div className="b f3 mt1">Krim Labs</div>
	 </div>
	 <div className="tl tr-ns mt4 mt0-ns o-80 f6 f5-ns">
	   <Meta />
	   <OpenSite />
	   <Netlify />
	   {attributeFreepik && <Freepik />}
	 </div>
       </div>)

export default Footer;
