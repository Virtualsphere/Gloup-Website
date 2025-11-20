import React from "react";
import useCounterUpOut from "../hooks/counterUpOutComma";
import { aboutfocus1, aboutfocus2 } from "../assets/images";
import Services from "../componets/Services";
import WhyChooseUs from "../componets/WhyChooseUs";

const About = () => {
  const experienceRef = useCounterUpOut({ end: 1998, delay: 10, time: 1000 });
  return (
    <>
      <div className="about-us-section" id="aboutus">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              {/* About Left Image Start  */}
              {/* <img src={aboutfocus1} alt="" /> */}
              <div className="about-image">
                <div className="row">
                  <div className="col-7">
                    <div className="about-img right-shape">
                      <figure className="reveal hover-anime">
                        <img src={aboutfocus1} alt="" />
                      </figure>
                    </div>
                  </div>

                  <div className="col-5">
                    <div className="about-year-image">
                      <div className="about-year">
                        <p>Since</p>
                        {/* <h4 className="counter">1998</h4> */}
                        <h4 ref={experienceRef} className="counter">
                          0
                        </h4>
                      </div>

                      <div className="about-img left-shape">
                        <figure className="reveal hover-anime">
                          <img src={aboutfocus2} alt="" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* About Left Image End  */}
            </div>

            <div className="col-lg-6">
              {/* Section Title Start  */}
              <div className="section-title">
                <h3 className="wow fadeInUp">About GloUp</h3>
                <h2 className="text-anime wow fadeInUp">
                  Luxury Salon Where You Will Feel Unique
                </h2>
              </div>
              {/* Section Title End  */}
              {/* About Content Start  */}
              <div
                className="about-content wow fadeInUp"
                data-wow-delay="0.75s"
              >
                <p>
                  It has been a really long time, and it hasn’t been easy
                  without your happy faces after a good day at the salon. Some
                  of you kept it interesting with attempts at self-grooming, and
                  we loved it. But we’re back now, ready to pamper you again.
                </p>

                <ul>
                  <li>
                    <span>01.</span> The hair cutting and styling with 10 years
                    of experience.
                  </li>
                  <li>
                    <span>02.</span> Update the latest technology and tendency
                    in the world.
                  </li>
                  <li>
                    <span>03.</span> Using the best products from the top
                    providers.
                  </li>
                </ul>

                <a href="#" className="btn-default">
                  Read More
                </a>
              </div>
              {/* About Content End  */}
            </div>
          </div>
        </div>
      </div>
      <Services />
      <WhyChooseUs />
    </>
  );
};

export default About;
