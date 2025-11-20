import React from "react";
import { Link } from "react-router-dom";
import {
  contactIcon,
  addressIcon,
  mailIcon,
  faxIcon,
  phoneIcon,
} from "../assets/images";
const Contact = () => {
  return (
    <div>
      {/* Page Header Section Start */}
      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8 order-md-1 order-2">
              {/* Page Heading Start */}
              <div className="page-header-box">
                <h1 className="text-anime">Contact Us</h1>
                {/* <ol className="breadcrumb wow fadeInUp" data-wow-delay="0.25s">
                  <li className="breadcrumb-item">
                    <Link href="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact
                  </li>
                </ol> */}
              </div>
              {/* Page Heading End */}
            </div>

            <div className="col-md-4 order-md-2 order-1">
              {/* Page Header Right Icon Start */}
              <div
                className="page-header-icon-box wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="page-header-icon">
                  <img src={contactIcon} alt="" />
                </div>
              </div>
              {/* Page Header Right Icon End */}
            </div>
          </div>
        </div>
      </div>
      {/* Page Header Section End */}

      {/* Contact Information Section Start */}
      <div className="contact-information">
        <div className="container">
          <div
            className="row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {[
              {
                icon: addressIcon,
                title: "Address",
                content: <>Chennai, Tamil Nadu, India</>,
              },
              {
                icon: phoneIcon,
                title: "Phone",
                content: <>+91 75388 08796</>,
                delay: "0.25s",
              },

              {
                icon: mailIcon,
                title: "Email",
                content: <>bookings@gmail.com</>,
                delay: "0.75s",
              },
            ].map((item, idx) => (
              <div className="col-lg-3 col-md-6" key={idx}>
                <div
                  className="contact-box wow fadeInUp"
                  data-wow-delay={item.delay || "0s"}
                >
                  <div className="icon-box">
                    <img src={item.icon} alt="" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Contact Information Section End */}

      {/* Get In Touch Section Start */}
      <div className="get-in-touch">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title">
                <h3 className="wow fadeInUp">Contact Form</h3>
                <h2 className="text-anime wow fadeInUp">
                  Get In Touch With Us
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="contact-form wow fadeInUp" data-wow-delay="0.75s">
                <form id="contactForm" noValidate>
                  <div className="row">
                    {[
                      { name: "name", type: "text", placeholder: "Name" },
                      { name: "email", type: "email", placeholder: "Email" },
                      { name: "phone", type: "text", placeholder: "Phone" },
                      { name: "subject", type: "text", placeholder: "Subject" },
                    ].map((field, idx) => (
                      <div className="form-group col-md-6 mb-4" key={idx}>
                        <input
                          type={field.type}
                          name={field.name}
                          className="form-control"
                          id={field.name}
                          placeholder={field.placeholder}
                          required
                        />
                        <div className="help-block with-errors"></div>
                      </div>
                    ))}

                    <div className="form-group col-md-12 mb-4">
                      <textarea
                        name="msg"
                        className="form-control"
                        id="msg"
                        rows="4"
                        placeholder="Write a Message"
                        required
                      ></textarea>
                      <div className="help-block with-errors"></div>
                    </div>

                    <div className="col-md-12 text-center">
                      <button type="submit" className="btn-default">
                        Submit Now
                      </button>
                      <div id="msgSubmit" className="h3 text-left hidden"></div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Get In Touch Section End */}

      {/* Google Map Start */}
      <div className="google-map">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="google-map-iframe">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115295.63487487636!2d78.4483918264236!3d25.43864500078133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1703825451377!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Google Map End */}
    </div>
  );
};

export default Contact;
