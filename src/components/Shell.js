import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Footer from "./Footer";
import SolanaBadge from "./SolanaBadge";
import colors from "../utils/colors";

const Shell = ({ attributeFreepik, nav: NavComponent, children }) => {
  const { pathname } = useLocation();

  // scroll to top of page when pathname changes
  // but not in dev mode, because it leads to bad DX
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="">
      {NavComponent}
      <div className="pt5" style={{ minHeight: "60vh" }}>
        {children}
      </div>
      <Footer />
      <SolanaBadge />
    </div>
  );
};

export default Shell;
