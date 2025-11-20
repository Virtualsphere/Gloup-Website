import React from "react";
import { Link } from "react-router-dom";
import { locationIcon, emailIcon, workingHoursIcon } from "../assets/images";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        {/* Footer Contact Information Section Start  */}
        <div className="footer-contact-information">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="contact-info-item wow fadeInUp">
                  <div className="icon-box">
                    <img src={locationIcon} alt="" />
                  </div>
                  <h3>Our Location</h3>
                  <p>Chennai, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="contact-info-item wow fadeInUp"
                  data-wow-delay="0.25s"
                >
                  <div className="icon-box">
                    <img src={emailIcon} alt="" />
                  </div>
                  <h3>Get in Touch</h3>
                  <p>
                    Phone: +91 75388 08796 <br />
                    Email: bookings@gmail.com <br />
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="contact-info-item wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="icon-box">
                    <img src={workingHoursIcon} alt="" />
                  </div>
                  <h3>Working Hours</h3>
                  <p>
                    Mon-Fri: 10:00 AM - 9:00 PM <br />
                    Saturday: 10:00 AM - 7:00 PM <br />
                    Sunday: 10:00 PM - 7:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Contact Information Section End  */}

        {/* Main Footer Start  */}
        <div className="footer-main">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="footer-logo">
                  <h2 style={{ color: "white" }}>GloUp</h2>
                </div>

                <div className="footer-social">
                  <ul>
                    <li>
                      <Link
                        to="https://www.facebook.com/profile.php?id=61576019464366"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="https://www.instagram.com/gloupoffl"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="#" style={{ textDecoration: "none" }}>
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </li> */}
                    {/* <li>
                      <Link to="#" style={{ textDecoration: "none" }}>
                        <i className="fab fa-linkedin-in"></i>
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="footer-menu">
                  <ul>
                    <li>
                      <Link to="/about" style={{ textDecoration: "none" }}>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" style={{ textDecoration: "none" }}>
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/terms-and-conditions"
                        style={{ textDecoration: "none" }}
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cancellation-refund"
                        style={{ textDecoration: "none" }}
                      >
                        Cancellation & Refund
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/privacy-policy"
                        style={{ textDecoration: "none" }}
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/faq" style={{ textDecoration: "none" }}>
                        FAQs
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="copyright mt-3">
                  <p>
                    Copyright &copy; {new Date().getFullYear()} GloUp. All
                    Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Footer End  */}
      </footer>
    </div>
  );
};

export default Footer;
