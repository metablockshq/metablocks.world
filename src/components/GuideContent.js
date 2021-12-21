import React from "react";
import { useRouteData } from "react-static";

import Shell from "./Shell";
import SEO from "./SEO";
import GuideIndex from "./GuideIndex";
import Markdown from "./Markdown";

const GuideContent = ({ chapterNumber, title, index, emoji, contents }) => {
  return (
    <React.Fragment>
      <div className="flex w-100">
        <GuideIndex className="w-20" index={index} />
        <div className="w-80">
          <div className="w-90 w-80-m w-50-l center">
            <p>{emoji}</p>
            <h1>
              {chapterNumber} {title}
            </h1>
          </div>
          <Markdown contents={contents} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default GuideContent;
