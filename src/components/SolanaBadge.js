import React from "react";

import config from "../config";

import solanaLogo from "../images/genft/solana.svg";
import devpost from "../images/genft/devpost.png";
import loveSign from "../images/genft/love-sign.png";

const { devpostLink, gleamLink } = config;

const MqItem = ({ imgSrc, imgAlt, title, href, aBody }) => (
  <div className="flex items-center mh2 tc">
    <img src={imgSrc} alt={imgAlt} className="mr2" style={{ height: 24 }} />
    <span className="bl b--black-60 ph1 black-80 f5">{title}</span>
    {href && (
      <a href={href} target="_blank" className="blue b ml2 pointer">
        {aBody}
      </a>
    )}
  </div>
);

const SolanaBadge = () => (
  <div
    className="fixed pa1 bottom-0"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.84)",
      backdropFilter: "saturate(180%) blur(5px)",
    }}
  >
    <MqItem
      imgSrc={solanaLogo}
      imgAlt="Solana Logo"
      title="Solana Ignition Hackathon Project"
    />
  </div>
);

export default SolanaBadge;
