import React from "react";
import { useRouteData } from "react-static";

import Shell from "../../components/Shell";
import SEO from "../../components/SEO";
import Markdown from "../../components/Markdown";

const Chapter = () => {
  const { chapterNumber, title, emoji, index, contents } = useRouteData();

  console.log(index);
  return (
    <React.Fragment>
      <SEO title={`${title}`} />
      <Shell>
        <div className="pt5">
          <p>{emoji}</p>
          <h1>{title}</h1>
          <Markdown contents={contents} />
        </div>
      </Shell>
    </React.Fragment>
  );
};

export default Chapter;
