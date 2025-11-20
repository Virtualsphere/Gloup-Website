import React from "react";
import { loaderIcon } from "../assets/images";

const Loader = () => {
  return (
    <div className="preloader">
      <div className="loading-container">
        <div className="loading"></div>
        <div id="loading-icon">
          <img src={loaderIcon} alt="Loading Icon" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
