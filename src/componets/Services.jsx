import React from "react";
import { hairColoring,hairTreatment,cuttingAndStyling } from "../assets/images";
import "../styles/custom.css";
import "../styles/all.mim.css";
import "../styles/animate.css";
import "../styles/bootstrap.min.css";
import "../styles/magnific-popup.css";
import "../styles/slicknav.min.css";
import "../styles/swiper-bundle.min.css";
const Services = () => {
  return (
    <div>
      {" "}
      <div className="home-services ">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* Section Title Start  */}
              <div className="section-title">
                <h3 className="wow fadeInUp">Professional Services</h3>
                <h2 className="text-anime wow fadeInUp">We are Expert in</h2>
              </div>
              {/*  Section Title End  */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              {/* Service Item Start  */}
              <div
                className="service-item-layout1 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="service-icon">
                  <img src={cuttingAndStyling} alt="" />
                </div>

                <h3>Cutting & Styling</h3>
                <p>
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam
                </p>
              </div>
              {/* Service Item End  */}
            </div>

            <div className="col-md-4">
              {/* Service Item Start  */}
              <div
                className="service-item-layout1 wow fadeInUp"
                data-wow-delay="0.75s"
              >
                <div className="service-icon">
                  <img src={hairTreatment} alt="" />
                </div>

                <h3>Hair Treatments</h3>
                <p>
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam
                </p>
              </div>
              {/* Service Item End */}
            </div>

            <div className="col-md-4">
              {/* Service Item Start  */}
              <div
                className="service-item-layout1 wow fadeInUp"
                data-wow-delay="1.0s"
              >
                <div className="service-icon">
                  <img src={hairColoring} alt="" />
                </div>

                <h3>Hair Coloring</h3>
                <p>
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam
                </p>
              </div>
              {/* Service Item End  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
