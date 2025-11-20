import React from "react";
import {
  whychooseus1,
  whychooseus2,
  whychooseusvideoImage,
  whychoosePlayicon,
} from "../assets/images";
import "../styles/custom.css";
import "../styles/all.mim.css";
import "../styles/animate.css";
import "../styles/bootstrap.min.css";
import "../styles/magnific-popup.css";
import "../styles/slicknav.min.css";
import "../styles/swiper-bundle.min.css";

const WhyChooseUs = () => {
  return (
    <div>
      {" "}
      <div className="why-choose-us">
        <div className="container">
          <div className="row align-items-center flex-column-reverse flex-lg-row">
            <div className="col-lg-6">
              {/* Section Title Start  */}
              <div className="section-title">
                <h3 className="wow fadeInUp">Why Choose us ?</h3>
                <h2 className="text-anime wow fadeInUp">
                  Are you Ready to Make a Big Change?
                </h2>
              </div>
              {/* Section Title End  */}

              {/* - Whyus Content Start   */}
              <div className="whyus-content">
                {/* Whyus Item Start  */}
                <div
                  className="whyus-feature-item wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="whyus-icon">
                    <img src={whychooseus1} alt="" />
                  </div>

                  <div className="whyus-desc">
                    <h3>Certified Stylists</h3>
                    <p>
                      It has been a really long time, and it hasn’t been easy
                      without your happy faces after a good day at the salon.
                      Some of you kept it interesting with attempts at
                      self-grooming, and we loved it. But we’re back now, ready
                      to pamper you again.
                    </p>
                  </div>
                </div>
                {/* Whyus Item End  */}

                {/* Whyus Item Start  */}
                <div
                  className="whyus-feature-item wow fadeInUp"
                  data-wow-delay="0.75s"
                >
                  <div className="whyus-icon">
                    <img src={whychooseus2} alt="" />
                  </div>

                  <div className="whyus-desc">
                    <h3>100% Organic Cosmetics</h3>
                    <p>
                      It has been a really long time, and it hasn’t been easy
                      without your happy faces after a good day at the salon.
                      Some of you kept it interesting with attempts at
                      self-grooming, and we loved it. But we’re back now, ready
                      to pamper you again.
                    </p>
                  </div>
                </div>
                {/* Whyus Item End */}
              </div>
              {/* Whyus Content End  */}
            </div>
            <div className="col-lg-6">
              {/* Video Start */}
              <div className="why-choose-us-video">
                <div className="video-image">
                  <figure className="hover-anime">
                    <img src={whychooseusvideoImage} alt="" />
                  </figure>
                </div>

                <div className="video-play-button">
                  <a
                    href="https://www.youtube.com/watch?v=2JNMGesMC2Y"
                    className="popup-video"
                  >
                    <img src={whychoosePlayicon} alt="" />
                  </a>
                </div>
              </div>
              {/* Video End */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
