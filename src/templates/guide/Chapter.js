import React from "react";
import { useRouteData } from "react-static";

import Shell from "../../components/Shell";
import SEO from "../../components/SEO";
import GuideContent from "../../components/GuideContent";
import Markdown from "../../components/Markdown";

const Chapter = () => {
  const { chapterNumber, title, emoji, index, contents, guideSlug, slug } =
    useRouteData();

  return (
    <React.Fragment>
      <SEO title={`${index.guide.data.title} / ${emoji} ${title}`} />
      <Shell>
        <GuideContent
          chapterNumber={chapterNumber}
          title={title}
          emoji={emoji}
          slug={slug}
          guideSlug={guideSlug}
          index={index}
          contents={contents}
        />
      </Shell>
    </React.Fragment>
  );
};

export default Chapter;
