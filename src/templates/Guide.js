import React from "react";
import { useRouteData } from "react-static";
import convert from "htmr";

import { TokenomicsNav } from "../components/Nav";
import Shell from "../components/Shell";
import SEO from "../components/SEO";
import Markdown from "../components/Markdown";
import GuideContent from "../components/GuideContent";
import colors from "../utils/colors";

const Guide = () => {
  const { title, subTitle, slug, heroImg, emoji, index, contents } =
    useRouteData();

  return (
    <React.Fragment>
      <SEO title={`Guide / ${emoji} ${title}`} />
      <Shell>
        <GuideContent
          title={title}
          emoji={emoji}
          slug={slug}
          index={index}
          heroImg={heroImg}
          contents={contents}
          subTitle={subTitle}
        />
      </Shell>
    </React.Fragment>
  );
};

export default Guide;
