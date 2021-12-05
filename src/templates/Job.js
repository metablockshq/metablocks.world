import React, { useState } from "react";
import { useRouteData } from "react-static";
import convert from "htmr";
import marked from "marked";

import { introMd, perksMd, whatAreWeLikeMd } from "./Careers";
import { TokenomicsNav } from "../components/Nav";
import Shell from "../components/Shell";
import SEO from "../components/SEO";
import Markdown from "../components/Markdown";
import colors from "../utils/colors";

const EngagmentType = ({ isFullTime }) => (
  <div className="center w-90 w-80-m w-50-l">
    <span className="bg-black white br2 pa1 f6">
      {isFullTime ? "Full Time" : "Contract"}
    </span>
  </div>
);

const Job = () => {
  const {
    title,
    isFullTime,
    emoji,
    intro,
    responsibilities,
    requirements,
    applyLink,
  } = useRouteData();

  return (
    <React.Fragment>
      <SEO title={`Meta Blocks / ${title}`} />
      <Shell>
        <div className="pt5">
          <div className="f-headline center w-90 w-80-m w-50-l">{emoji}</div>
          <h1 className="center w-90 w-80-m w-50-l mb1 mt0">{title}</h1>
          <EngagmentType isFullTime={isFullTime} />

          <Markdown contents={marked.parse(introMd)} />
          {intro && <Markdown contents={intro} />}

          <h2 className="center w-90 w-80-m w-50-l">Responsibilities</h2>
          <Markdown contents={responsibilities} />

          <h2 className="center w-90 w-80-m w-50-l">Requirements</h2>
          <Markdown contents={requirements} />

          <h2 className="center w-90 w-80-m w-50-l">Perks and benefits</h2>
          <Markdown contents={marked.parse(perksMd)} />

          <div className="center w-90 w-80-m w-50-l mt4">
            <a href={applyLink} className="bg-blue white pa2 br3 f4 b">
              Apply Now
            </a>
          </div>
        </div>
      </Shell>
    </React.Fragment>
  );
};

export default Job;
