import React from "react";
import {Link} from "react-router-dom";

import pushpin from "../images/emoji/pushpin.png";

const OpenForProjects = ({}) => {
  return (<div className="flex bg-white-10 br2 pa2 pa3-ns mb3 f7 sans-serif">
    <div className="w-20 w-10-ns pr2">
      <img src={pushpin} alt="Push Pin" className=""/>
    </div>

    <div>
      I'm currently open to take new projects. Please <Link to="/contact" className="underline">contact</Link> me if you need support with Clojure, React or JavaScript.
    </div>
   
  </div>);
}

export default OpenForProjects;