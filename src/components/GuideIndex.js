import React from "react";
import { NavLink } from "react-router-dom";

const Guide = ({ data }) => (
  <NavLink
    exact
    to={`/guides/${data.slug}`}
    className="pv2 ph4 f3 bb b--black-10 w-100"
    activeClassName="b"
  >
    <span className="mr2">{data.emoji}</span>
    {data.title}
  </NavLink>
);

const Chapter = ({ data }) => (
  <NavLink
    exact
    to={`/guides/${data.guideSlug}/${data.slug}`}
    className="db"
    activeClassName="b bg-washed-green"
  >
    <div className="flex justify-between pv2 ph4">
      <div>
        <span className="black-60 mr2">{data.chapterNumber}. </span>
        {data.title}
      </div>
      <div className="">{data.emoji}</div>
    </div>
  </NavLink>
);

const GuideIndex = ({ className, index }) => {
  return (
    <div className={`fixed br b--black-10 ${className ? className : ""}`}>
      <div className="flex items-center">
        <Guide data={index.guide.data} />
      </div>
      {index.chapters.map((c) => {
        return (
          <div key={c.data.slug}>
            <Chapter data={c.data} />
          </div>
        );
      })}
    </div>
  );
};

export default GuideIndex;
