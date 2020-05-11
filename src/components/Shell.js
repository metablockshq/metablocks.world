import React from "react";

import Nav from "./Nav.js";
import Footer from "./Footer.js";
import colors from "../utils/colors";

const Shell = ({children}) => {
  return (<div className="min-vh-100 white" style={{backgroundColor: colors.BLACK}}>
	    <Nav />
	    {children}
	    <Footer />
	   </div>);
};

export default Shell;
