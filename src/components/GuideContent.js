import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useRouteData } from "react-static";

import Shell from "./Shell";
import SEO from "./SEO";
import GuideIndex from "./GuideIndex";
import Markdown from "./Markdown";

const NextPreviousButton = ({ forward, label, visible, to }) => {
  const leftPointingFinger = "👈";
  const rightPointingFinger = "👉";

  if (visible) {
    return (
      <Link to={to}>
        <div className="pointer ba b--light-green shadow-4  ph2 br2 f5 flex items-center">
          {!forward && (
            <div className="mr2 br b--black-10 pv2 f3">
              {leftPointingFinger}
            </div>
          )}
          {label}

          {forward && (
            <div className="ml2 bl b--black-10 pv2 f3">
              {rightPointingFinger}
            </div>
          )}
        </div>
      </Link>
    );
  } else {
    return <div />;
  }
};

const NextPrevious = ({ index, slug, guideSlug }) => {
  const isChapter = Boolean(guideSlug);

  const next = (() => {
    const hasChapters = index.chapters.length > 0;

    if (!isChapter && hasChapters) {
      // at the guide page, next slug is the first chapter
      return index.chapters[0];
    }

    if (isChapter) {
      const currentChapterIndex = index.chapters.findIndex(
        (c) => c.data.slug === slug
      );
      const nextChapter = index.chapters[currentChapterIndex + 1];
      if (nextChapter) {
        return nextChapter;
      }
    }

    return null;
  })();

  const previous = (() => {
    if (isChapter) {
      if (slug === index.chapters[0].data.slug) {
        // first chapter, previous page will be the guide page
        return index.guide;
      } else {
        // not the first chapter, return the chapter before this one
        const currentChapterIndex = index.chapters.findIndex(
          (c) => c.data.slug === slug
        );
        const previousChapter = index.chapters[currentChapterIndex - 1];
        return previousChapter;
      }
    }
    return null;
  })();

  const nextTo = next && `/guides/${next.data.guideSlug}/${next.data.slug}`;
  const previousTo =
    previous &&
    (!previous.data.guideSlug
      ? `/guides/${previous.data.slug}`
      : `/guides/${previous.data.guideSlug}/${previous.data.slug}`);

  return (
    <div className="mt4 w-90 w-80-m w-50-l center flex justify-between">
      <NextPreviousButton
        to={previousTo}
        forward={false}
        label={previous && previous.data.title}
        visible={isChapter}
      />

      <NextPreviousButton
        to={nextTo}
        forward={true}
        label={next && next.data.title}
        visible={Boolean(next)}
      />
    </div>
  );
};

const GuideContent = ({
  heroImg,
  chapterNumber,
  title,
  subTitle,
  index,
  emoji,
  slug,
  guideSlug, // if this is empty, it means that this is the guide home page
  contents,
}) => {
  return (
    <React.Fragment>
      <div className="flex w-100">
        <GuideIndex className="w-20" index={index} />
        <div className="w-100 tw-ml-40 md:tw-ml-32 lg:tw-ml-16">
          <div className="w-90 w-80-m w-50-l center">
            {heroImg && (
              <img
                alt={`${title} hero image`}
                className="w-100 vh-25 br2"
                src={heroImg}
              />
            )}
            <div className={`f-headline ${heroImg ? "nt5" : ""}`}>{emoji}</div>
            <h1 className="tw-text-4xl tw-font-bold">
              {chapterNumber && (
                <span className="black-60 mr2">{chapterNumber}. </span>
              )}
              {title}
            </h1>
            {subTitle && <h2>{subTitle}</h2>}
          </div>
          <Markdown contents={contents} />
          <NextPrevious index={index} slug={slug} guideSlug={guideSlug} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default GuideContent;
