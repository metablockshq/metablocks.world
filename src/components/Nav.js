import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import Dropdown from "react-dropdown";

import SignupDialog from "../components/SignupDialog";
import config from "../config";
import colors from "../utils/colors";

import mountainFlag from "../images/genft/mountain-flag.png";
import hourGlass from "../images/genft/hour-glass.png";
import phoneChat from "../images/genft/phone-chat.png";
import moneyVault from "../images/genft/money-vault.png";
import tokenGraph from "../images/genft/token-graph.png";
import chartStats from "../images/genft/chart-stats.png";

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
        className="flex pv2 justify-between items-center"
        style={{
          backgroundColor: backgroundColor || "rgba(255, 255, 255, 0.64)",
          backdropFilter: "saturate(180%) blur(5px)",
          height: 52,
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        {leftItem}
        <div className="dn dn-m flex-ns justify-end">
          {links.map((l) => (
            <NavLink
              key={l.label}
              activeClassName={l.activeClassName}
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

const metaBlocksLinks = ({ onConnectWalletClick }) => [
  {
    label: "Use cases",
    to: "#use-cases",
    // icon: mountainFlag
  },
  {
    label: "Discord",
    to: { pathname: discordInviteLink },
    // icon: phoneChat,
    targetBlank: true,
  },
  {
    label: "Twitter",
    to: { pathname: twitterLink },
    // icon: phoneChat,
    targetBlank: true,
  },
  {
    label: "Timeline",
    to: "#timeline",
    icon: hourGlass,
    hidden: true,
  },
  {
    label: "Tokenomics",
    to: "/tokenomics",
  },
  {
    label: "Whitepaper",
    to: "/whitepaper",
    icon: chartStats,
    hidden: true,
  },
  {
    label: "Connect wallet",
    to: "/",
    onClick: onConnectWalletClick,
    restingClassName: "bg-light-red br-pill ph3 white b",
  },
];

const MetaBlocksNav = ({
  signupDialogOpen,
  setSignupDialogOpen,
  onConnectWalletClick = () => {},
}) => (
  <>
    <SignupDialog
      open={signupDialogOpen}
      onDismiss={() => setSignupDialogOpen(false)}
    />
    <BaseNav
      backgroundColor="rgba(255, 255, 255, 0.8)"
      links={metaBlocksLinks({ onConnectWalletClick }).filter((l) => !l.hidden)}
      leftItem={<BaseLeftItem />}
    />
  </>
);

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

export { MetaBlocksNav, TokenomicsNav };
