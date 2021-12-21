import React from "react";
import { NavLink } from "react-router-dom";

const Guide = ({ data }) => (
  <NavLink exact to={`/guides/${data.slug}`} activeClassName="b">
    {data.emoji}
    {data.title}
  </NavLink>
);

const Chapter = ({ data }) => (
  <NavLink
    exact
    to={`/guides/${data.guideSlug}/${data.slug}`}
    activeClassName="b"
  >
    {data.emoji}
    {data.chapterNumber}
    {data.title}
  </NavLink>
);

const GuideIndex = ({ className, index }) => {
  return (
    <div className={`br b--black-10 ${className ? className : ""}`}>
      <div className="flex items-center bg-black-10 pa4">
        <Guide data={index.guide.data} />
      </div>
      {index.chapters.map((c) => {
        return (
          <div>
            <Chapter data={c.data} />
          </div>
        );
      })}
    </div>
  );
};

export default GuideIndex;
