import React from "react";
import { TwitterVideoEmbed } from "react-twitter-embed";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import convert from "htmr";

import "./markdown.css";

const getId = (href) => {
  const parts = href.split("/");
  return parts.at ? parts.at(-1) : null;
};

const transform = {
  p: ({ children }) => {
    const el = children[0];
    const isElImg =
      el.props &&
      el.props.hasOwnProperty("alt") &&
      el.props.hasOwnProperty("src");
    return (
      <p className={`georgia center ${isElImg ? "tc" : "w-90 w-80-m w-50-l"}`}>
        {children}
      </p>
    );
  },
  // pre: ({props, children}) => <div className="w-90 w-80-m w-50-l center"><pre {...props}>{children}</pre></div>,
  h1: ({ children }) => (
    <h1 className="w-90 w-80-m w-50-l center">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="w-90 w-80-m w-50-l center">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="w-90 w-80-m w-50-l center">{children}</h3>
  ),
  hr: ({ children }) => (
    <hr className="w-90 w-80-m w-60-l center">{children}</hr>
  ),
  ul: ({ children }) => (
    <ul className="w-90 w-80-m w-50-l center">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="w-90 w-80-m w-50-l center">{children}</ol>
  ),
  li: ({ children }) => <li className="georgia mb3">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="georgia i f3">{children}</blockquote>
  ),
  a: ({ href, children }) => {
    if (href.startsWith("https://gist.github.com")) {
    }
    // we only want to embed status, not twitter profiles
    if (href.startsWith("https://twitter.com") && href.includes("/status/")) {
      const id = getId(href);
      return <TwitterVideoEmbed id={id} />;
    }
    if (href.startsWith("https://youtu.be")) {
      const id = getId(href);
      return (
        <LiteYouTubeEmbed
          id={id}
          adNetwork={false}
          playlist={false}
          poster="hqdefault"
          noCookie={true}
        />
      );
    }
    // TODO: Use react-router link for internal links
    return (
      <a href={href} target="_blank">
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    const srcParts = src.split ? src.split("?") : [null];
    const size = srcParts[1];
    const sizeClass = !size
      ? "w-90 w-80-m w-50-l"
      : size === "original"
      ? "w-auto"
      : size === "medium"
      ? "w-90 w-80-m w-60-l"
      : size === "large"
      ? "w-90 w-80-ns"
      : "w-90 w-80-m w-90-l"; // if it's not large, it's x-large
    return (
      <img src={src} className={`center ${sizeClass}`} alt={String(alt)} />
    );
  },
};

const Markdown = ({ contents }) => {
  return (
    <div className="lh-copy f4 markdown">
      {contents && convert(contents, { transform })}
    </div>
  );
};

export default Markdown;
