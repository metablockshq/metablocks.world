import React from "react";
import {Link} from "react-router-dom";

import colors from "../utils/colors";

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

const Footer = () => {
  return (<div className="w-100 pv3 bg-black-20">
	    <div className="flex flex-column flex-row-ns w-90 w-70-ns center justify-between">
	      <div className="ph3">
		<div className="mb2">Krim Labs</div>
		<div className="o-80 f6">© 2017-2020 </div>
		<div className="o-80 f6">All rights reserved</div>
	      </div>

	      <div className="flex">
		<Column header="Social" links={socialLinks} />
		<Column header="Navigation" links={siteLinks} />
	      </div>
	    </div>
	  </div>);
};

export default Footer;
