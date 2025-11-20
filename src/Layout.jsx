import React from "react";
import Header from "./componets/Header";
import PageHeader from "./componets/PageHeader";
import AppRoutes from "./routes";
import Footer from "./componets/Footer";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="tt-magic-cursor">
      {/* <MagicCursor /> */}
      {location.pathname == "/" ? <Header /> : <PageHeader />}

      <AppRoutes />
      <Footer />
    </div>
  );
};

export default Layout;
