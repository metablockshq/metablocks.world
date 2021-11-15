import React from "react";

const EmojiHeading = ({ title, color, emoji }) => (
  <div className="flex justify-center items-center">
    <h1 className="f4 f3-m f1-l" style={{ color }}>
      {title}
    </h1>
    <div className="h2 h3-l w2 w3-l">
      <img src={emoji} loading="lazy" className="h2 h3-l pl1 pl3-l" />
    </div>
  </div>
);

export default EmojiHeading;
