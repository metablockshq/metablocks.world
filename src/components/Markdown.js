import React from 'react';
import convert from 'htmr';

import './markdown.css';

const transform = {
  p: ({children}) => <p className="georgia">{children}</p>,
  li: ({children}) => <li className="georgia mb3">{children}</li>,
  blockquote: ({children}) => <blockquote className="georgia i f3">{children}</blockquote>,
  a: ({href, children}) => <a href={href} target="_blank">{children}</a>,
  img: ({src, alt}) => <img src={src} className="" alt={String(alt)}/>
};

const Markdown = ({contents}) => {
  return (<div className="lh-copy f4 markdown">
    {contents && convert(contents, {transform})}
  </div>);
}

export default Markdown;