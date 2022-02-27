import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import Dropdown from "react-dropdown";

import SignupDialog from "../components/SignupDialog";
import config from "../config";
import colors from "../utils/colors";

const { discordInviteLink, twitterLink } = config;

const NavItem = ({ l }) => {
  return (
    <div className="flex items-center" style={{ height: 32 }}>
      {l.icon && (
        <div className="pt1 black-90">
          <img src={l.icon} className="mr2" style={{ height: 32 }} />
        </div>
      )}

      <div className="f4">{l.label}</div>
      {l.count && (
        <span className="ml2 bg-green white b br4 ph2 pv1">{l.count}</span>
      )}
    </div>
  );
};

const scrollToId = (id) => () => {
  if (window && document) {
    const $el = document.getElementById(id.substring(1));
    window.scrollTo({ left: 0, top: $el.offsetTop - 80, behaviour: "smooth" });
  }
};

const BaseNav = ({ backgroundColor, leftItem, links, rightItem }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <nav
      className="fixed w-100 z-1 db top-0"
      style={{ left: "50%", transform: "translateX(-50%)" }}
    >
      <div
        className="pa4 bb b--black-10 flex pv2 justify-between items-center w-100 center"
        style={{
          backgroundColor: backgroundColor || "rgba(0, 0, 0, 0.64)",
          backdropFilter: "saturate(180%) blur(5px)",
          height: 48,
        }}
      >
        {leftItem}
        <div className="dn dn-m flex-ns justify-end">
          {links.map((l) => (
            <NavLink
              key={l.label}
              activeClassName={l.activeClassName || "bb b--green"}
              className={`ml4 bb bw2 b--white-05 ${l.restingClassName || ""}`}
              to={l.to}
              target={l.targetBlank && "_blank"}
              onClick={
                l.onClick ||
                (l.to.startsWith && l.to.startsWith("#")
                  ? scrollToId(l.to)
                  : () => {})
              }
            >
              <NavItem l={l} />
            </NavLink>
          ))}
          {rightItem}
        </div>

        <div className="flex dn-l">
          <Dropdown
            options={links.map((l) => ({
              ...l,
              className: "mv3",
              value: l.to,
            }))}
            placeholder="• • •"
            placeholderClassName="db pointer mr3 mr0-ns"
            menuClassName="fixed right-0 mr3 pl3 pr4 white bg-black br3 mt2"
            onChange={(selected) => {
              const onClickFn = links.find(
                (l) => l.label === selected.label
              ).onClick;
              if (onClickFn) onClickFn();
              if (selected.value.startsWith && selected.value.startsWith("#"))
                scrollToId(selected.value)();
              if (selected.value.pathname && window)
                window.location.replace(selected.value.pathname);
              else history.push(selected.value);
            }}
          />
        </div>
      </div>
    </nav>
  );
};

const BaseLeftItem = () => (
  <NavLink to="/" className="b f5 f4-ns dib">
    Meta Blocks
  </NavLink>
);

const metaBlocksLinks = (jobsCount) => [
  {
    label: "Discord",
    to: { pathname: discordInviteLink },
    // icon: phoneChat,
    targetBlank: true,

    hidden: true,
    emoji: "💬",
  },
  {
    label: "Docs",
    to: "/guides/protocol",
  },
  {
    label: "Twitter",
    to: { pathname: twitterLink },
    // icon: phoneChat,
    targetBlank: true,
    emoji: "🐦",
  },
  {
    label: "Timeline",
    to: "#timeline",
    hidden: true,
  },
  {
    label: "Tokenomics",
    to: "/tokenomics",

    hidden: true,
    emoji: "💹",
  },
  {
    label: "Whitepaper",
    to: "/whitepaper",
    hidden: true,
  },
  {
    label: "Blog",
    to: "/blog",
    emoji: "✍🏻",
  },
  {
    label: "Careers",
    to: "/careers",
    emoji: "💼",
    count: jobsCount,
  },
  {
    label: "Contact",
    to: "/contact",
    emoji: "☎️",
    hidden: true,
  },
  {
    label: "Join waitlist",
    to: "/campaigns/website-waitlist",
    restingClassName: "br-pill bg-light-red white b ph3",
    // why is this needed?
    activeClassName: "x",
    emoji: "🤍",
    hidden: true,
  },
];

const MainNav = ({ jobsCount }) => {
  return (
    <BaseNav
      backgroundColor="rgba(255, 255, 255, 0.8)"
      links={metaBlocksLinks(jobsCount).filter((l) => !l.hidden)}
      leftItem={<BaseLeftItem />}
    />
  );
};

const TokenomicsLeftItem = () => (
  <div className="flex f5 f4-ns">
    <div className="black-60 mr2">
      <BaseLeftItem />
    </div>
    /
    <NavLink to="/tokenomics" className="ml2 b">
      Tokenomics
    </NavLink>
  </div>
);

const TokenomicsNav = ({ rightItem }) => (
  <BaseNav links={[]} leftItem={<TokenomicsLeftItem />} />
);

export { MainNav, TokenomicsNav };
