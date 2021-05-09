import React from "react";
import {Link} from "react-router-dom";

import pushpin from "../images/emoji/pushpin.png";

const Pinboard = ({content}) => {
    return (<div className="flex bg-black-10 br2 pa2 pa3-ns mb3 f7 sans-serif">
		<div className="w-20 w-10-ns pr2">
		    <img src={pushpin} alt="Push Pin" className=""/>
		</div>

		<div>
		    {content}
		</div>
	    </div>);
}

export default Pinboard;
