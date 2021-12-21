import React from "react";
import { useRouteData } from "react-static";
import convert from "htmr";

import { TokenomicsNav } from "../components/Nav";
import Shell from "../components/Shell";
import SEO from "../components/SEO";
import Markdown from "../components/Markdown";
import colors from "../utils/colors";

const Guide = () => {
  const { title, slug, heroImg, emoji, index, contents } = useRouteData();

  console.log(index);
  return (
    <React.Fragment>
      <SEO title={`Meta Blocks / Guide / ${title}`} />
      <Shell>
        <div className="pt5">
          <img alt={`Hero image for ${title}`} src={heroImg} />
          <p>{emoji}</p>
          <h1>{title}</h1>
          <Markdown contents={contents} />
        </div>
      </Shell>
    </React.Fragment>
  );
};

export default Guide;
