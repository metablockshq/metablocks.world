import React from "react";
import { Link } from "react-router-dom";

import colors from "../utils/colors";

const Column = ({ header, links }) => {
  return (
    <div className="ph3 mt3 mt0-ns">
      <div className="mb3 o-40">{header}</div>
      {links.map((l, i) => {
        return (
          <div key={`${l.label}-${i}`} className="mt2">
            {l.url.startsWith("http") ? (
              <a href={l.url} target="_blank">
                {l.label}
              </a>
            ) : (
              <Link to={l.url}>{l.label}</Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

const socialLinks = [
  {
    label: "Github",
    url: "https://github.com/krimlabs",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/krimlabs",
  },
];

const siteLinks = [
  {
    label: "Blog",
    url: "/blog",
  },
  {
    label: "Contact",
    url: "/contact",
  },
  {
    label: "Clients",
    url: "/clients",
  },
  {
    label: "Careers",
    url: "/careers",
  },
  {
    label: "Philosophy",
    url: "/philosophy",
  },
];

const FooterLegacy = () => (
  <div className="w-100 pv3 bg-black-20">
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
  </div>
);

const Meta = () => (
  <div className="b">
    <Link to="/guides/handbook" className="dib mr2 underline">
      Handbook
    </Link>
    <Link to="/guides/protocol" className="dib mr2 underline">
      Protocol Guide
    </Link>
    <a href="https://twitter.com/MetaBlocksHQ" className="dib mr2 underline">
      Twitter
    </a>
    <a href="https://github.com/metablockshq" className="dib mr2 underline">
      Github
    </a>
    <a href="https://discord.gg/YUJq9kW3RV" className="dib mr2 underline">
      Discord
    </a>
    <a
      href="https://www.reddit.com/r/MetaBlocks/"
      className="dib mr2 underline"
    >
      Reddit
    </a>
  </div>
);

const OpenSite = () => (
  <div className="mt3">
    This{" "}
    <a
      href="https://github.com/metablockshq/metablocks.world"
      className="underline"
    >
      open-source
    </a>{" "}
    site was built with{" "}
    <a
      href="https://github.com/react-static/react-static"
      className="underline"
    >
      React Static
    </a>
    .
  </div>
);

const Cloudflare = () => (
  <div className="mt1">
    Hosting and deployment courtesy of{" "}
    <a href="https://cloudflare.com" className="underline">
      Cloudflare
    </a>
    .
  </div>
);

const Footer = ({}) => (
  <div className="flex flex-column flex-row-ns w-90 justify-between center pt4 pb5 mt4">
    <div>
      <div className="o-80 f6">© 2021</div>
      <div className="b f3 mt1">Meta Blocks</div>
    </div>
    <div className="tl tr-ns mt4 mt0-ns o-80 f6 f5-ns">
      <Meta />
      <OpenSite />
      <Cloudflare />
    </div>
  </div>
);

export default Footer;
