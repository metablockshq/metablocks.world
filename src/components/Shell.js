import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { MainNav, MainNavContext } from "./Nav";
import Footer from "./Footer";
import SolanaBadge from "./SolanaBadge";
import colors from "../utils/colors";

const Shell = ({ attributeFreepik, children }) => {
  const { pathname } = useLocation();

  const [mainNavPinned, setMainNavPinned] = useState(true);
  const onPin = () => setMainNavPinned(true);
  const onUnpin = () => setMainNavPinned(false);

  // scroll to top of page when pathname changes
  // but not in dev mode, because it leads to bad DX
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <MainNavContext.Provider value={{ mainNavPinned, onPin, onUnpin }}>
      <MainNav />

      <div className="pt5" style={{ minHeight: "60vh" }}>
        {children}
      </div>
      <Footer />
      <SolanaBadge />
    </MainNavContext.Provider>
  );
};

export default Shell;
