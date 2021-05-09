import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";

import Nav from "./Nav.js";
import Footer from "./Footer.js";
import colors from "../utils/colors";

const Shell = ({children}) => {
  const {pathname} = useLocation()

  // scroll to top of page when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]);

  return (<div className="">
	    <Nav />
	    <div className="pt5" style={{minHeight: "90vh"}}>
	      {children}
	    </div>
	    <Footer />
	   </div>);
};

export default Shell;
