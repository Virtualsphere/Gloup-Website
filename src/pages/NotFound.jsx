import React from "react";
import { warningIcon, notFoundImage } from "../assets/images";
const NotFound = () => {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8 order-md-1 order-2">
              <div className="page-header-box">
                <h1 className="text-anime">Page Not Found</h1>
              </div>
            </div>

            <div className="col-md-4 order-md-2 order-1">
              <div
                className="page-header-icon-box wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="page-header-icon">
                  <img src={warningIcon} alt="404 Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-not-found">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div
                className="page-not-found-box wow fadeInUp"
                data-wow-delay="0.25s"
              >
                <div className="not-found-image">
                  <img src={notFoundImage} alt="Page Not Found" />
                </div>

                <h3>Page Not Found!</h3>
                <p>
                  The page you are looking for might have been removed, had its
                  name changed,
                  <br /> or is temporarily unavailable.
                </p>

                <a href="#" className="btn-default">
                  Back To Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
