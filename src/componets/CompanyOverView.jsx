import React from "react";
import { experience, clients, members } from "../assets/images";
import useCounterUp from "../hooks/counterUp";


const CompanyOverView = () => {
  const experienceRef = useCounterUp({ end: 19, delay: 10, time: 2000 });
  const clientsRef = useCounterUp({ end: 200, delay: 10, time: 2000 });
  const membersRef = useCounterUp({ end: 29, delay: 10, time: 2000 });
  return (
    <div>
      {" "}
      <div className="fun-facts">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              {/* Section Title Start  */}
              <div className="section-title">
                <h3 className="wow fadeInUp">Company Overview</h3>
                <h2 className="text-anime wow fadeInUp">Facts & Figures</h2>
              </div>
              {/* Section Title End  */}
            </div>

            <div className="col-lg-7">
              <div className="facts-counter">
                <div className="row">
                  <div className="col-md-4">
                    {/* Counter Item Start  */}
                    <div
                      className="facts-item wow fadeInUp"
                      data-wow-delay="0.5s"
                    >
                      <div className="icon-box">
                        <img src={experience} alt="" />
                      </div>

                      <h3>
                        {/* <span className="counter">19</span>+ */}
                        <span ref={experienceRef}>0</span>+
                      </h3>
                      <p>Years of Experience.</p>
                    </div>
                    {/* Counter Item End  */}
                  </div>

                  <div className="col-md-4">
                    {/* Counter Item Start  */}
                    <div
                      className="facts-item wow fadeInUp"
                      data-wow-delay="0.75s"
                    >
                      <div className="icon-box">
                        <img src={clients} alt="" />
                      </div>

                      <h3>
                        {/* <span className="counter">200</span>+ */}
                        <span ref={clientsRef}>0</span>+
                      </h3>
                      <p>Company Clients</p>
                    </div>
                    {/* Counter Item End  */}
                  </div>

                  <div className="col-md-4">
                    {/* Counter Item Start  */}
                    <div
                      className="facts-item wow fadeInUp"
                      data-wow-delay="1.0s"
                    >
                      <div className="icon-box">
                        <img src={members} alt="" />
                      </div>

                      <h3>
                        {/* <span className="counter">29</span>+ */}
                        <span ref={membersRef}>0</span>+
                      </h3>
                      <p>Staff Members</p>
                    </div>
                    {/* Counter Item End  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverView;
