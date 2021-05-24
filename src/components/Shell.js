import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";

import Nav from "./Nav.js";
import Footer from "./Footer.js";
import colors from "../utils/colors";

const Shell = ({attributeFreepik, nav: NavComponent, children}) => {
  const {pathname} = useLocation()

  // scroll to top of page when pathname changes
  // but not in dev mode, because it leads to bad DX
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      window.scrollTo(0, 0)
    }
  }, [pathname]);

  return (<div className="">
	    {NavComponent ? <NavComponent /> : <Nav />}
	    <div className="pt4" style={{minHeight: "90vh"}}>
	      {children}
	    </div>
	    <Footer attributeFreepik={attributeFreepik} />
	   </div>);
};

export default Shell;
