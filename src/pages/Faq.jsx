import React from "react";
import { faqIcon } from "../assets/images";
const Faq = () => {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8 order-md-1 order-2">
              {/* Page Heading Start */}
              <div className="page-header-box">
                <h1 className="text-anime">FAQ's</h1>
                {/* <ol className="breadcrumb wow fadeInUp" data-wow-delay="0.25s">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">FAQs</li>
                </ol> */}
              </div>
              {/* Page Heading End */}
            </div>

            <div className="col-md-4 order-md-2 order-1">
              {/* Page Header Right Icon Start */}
              <div className="page-header-icon-box wow fadeInUp" data-wow-delay="0.5s">
                <div className="page-header-icon">
                  <img src={faqIcon} alt="" />
                </div>
              </div>
              {/* Page Header Right Icon End */}
            </div>
          </div>
        </div>
      </div>

      {/* Page FAQs Start */}
      <div className="page-faqs">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              {/* FAQ Accordion Start */}
              <div className="faq-accordion">
                <div className="accordion" id="faq_accordion">
                  {[
                    {
                      id: 1,
                      question:
                        "How does your platform help me find the right salon?",
                      answer:
                        "We connect you with top-rated salons based on your preferences, location, and service needs. Our curated listings ensure you get access to quality salons that match your expectations.",
                      delay: "0s",
                    },
                    {
                      id: 2,
                      question:
                        "Can I explore different salon services on your platform?",
                      answer:
                        "Yes, our platform allows you to browse through a variety of salons and their services including haircuts, styling, coloring, skincare, and more.",
                      delay: "0.25s",
                    },
                    {
                      id: 3,
                      question: "How do salons get listed on your platform?",
                      answer:
                        "We onboard salons through a quality check process, ensuring they meet our standards for service, hygiene, and professionalism before being listed.",
                      delay: "0.5s",
                    },
                    {
                      id: 4,
                      question:
                        "Is there any cost involved for customers to use your platform?",
                      answer:
                        "No, our platform is free to use for clients. You can explore salons, view services, and choose the best options at your convenience.",
                      delay: "0.75s",
                    },
                    {
                      id: 5,
                      question: "Can I view salon ratings and reviews?",
                      answer:
                        "Absolutely. Each salon profile features ratings and reviews from clients to help you make an informed decision.",
                      delay: "1.0s",
                    },
                    {
                      id: 6,
                      question:
                        "Do you offer customer support for booking issues?",
                      answer:
                        "Yes, we provide customer support to assist with any questions or concerns related to finding or connecting with salons through our platform.",
                      delay: "1.25s",
                    },
                    {
                      id: 7,
                      question:
                        "How can salons benefit from joining your platform?",
                      answer:
                        "Salons gain increased visibility, client engagement, and access to tools that help manage and grow their business.",
                      delay: "1.5s",
                    },
                    {
                      id: 8,
                      question: "Is your service available in all locations?",
                      answer:
                        "We are continually expanding our reach. You can check availability by browsing your city or locality on our platform.",
                      delay: "1.75s",
                    },
                  ].map(({ id, question, answer, delay }) => (
                    <div
                      className="accordion-item wow fadeInUp"
                      data-wow-delay={delay}
                      key={id}
                    >
                      <h2 className="accordion-header" id={`heading${id}`}>
                        <button
                          className={`accordion-button ${
                            id !== 1 ? "collapsed" : ""
                          }`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${id}`}
                          aria-expanded={id === 1 ? "true" : "false"}
                          aria-controls={`collapse${id}`}
                        >
                          {question}
                        </button>
                      </h2>
                      <div
                        id={`collapse${id}`}
                        className={`accordion-collapse collapse ${
                          id === 1 ? "show" : ""
                        }`}
                        aria-labelledby={`heading${id}`}
                        data-bs-parent="#faq_accordion"
                      >
                        <div className="accordion-body">
                          <p>{answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* FAQ Accordion End */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
