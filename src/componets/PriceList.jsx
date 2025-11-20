import React from "react";
import { priceIcon } from "../assets/images";
const PriceList = () => {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            {/* Page Heading */}
            <div className="col-md-8 order-md-1 order-2">
              <div className="page-header-box">
                <h1 className="text-anime">Our Pricing</h1>
              
              </div>
            </div>

            {/* Page Header Right Icon */}
            <div className="col-md-4 order-md-2 order-1">
              <div
                className="page-header-icon-box wow fadeInUp"
                data-wow-delay="0.50s"
              >
                <div className="page-header-icon">
                  <img src={priceIcon} alt="Pricing Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pricing">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* Section Title Start */}
              <div className="section-title">
                <h3 className="wow fadeInUp">Price List</h3>
                <h2 className="text-anime wow fadeInUp">Our Best Prices</h2>
              </div>
              {/* Section Title End */}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6">
              {/* Pricing Item Start */}
              <div className="pricing-item wow fadeInUp" data-wow-delay="0.50s">
                <div className="pricing-info">
                  <h3>Haircut</h3>
                  <p>
                    
                    It has been a really long time, and it hasn’t been easy without your happy faces after a good day at the salon.
Some of you kept it interesting with attempts at self-grooming, and we loved it.
But we’re back now, ready to pamper you again.
                  </p>
                </div>

                <div className="pricing-price">
                  <p>$29</p>
                </div>
              </div>
              {/* Pricing Item End */}
            </div>

            <div className="col-lg-4 col-md-6">
              {/* Pricing Item Start  */}
              <div className="pricing-item wow fadeInUp" data-wow-delay="0.74s">
                <div className="pricing-info">
                  <h3>Blow Dry & Curl</h3>
                  <p>
                    It has been a really long time, and it hasn’t been easy without your happy faces after a good day at the salon.
Some of you kept it interesting with attempts at self-grooming, and we loved it.
But we’re back now, ready to pamper you again.
                  </p>
                </div>

                <div className="pricing-price">
                  <p>$69</p>
                </div>
              </div>
              {/* Pricing Item End  */}
            </div>

            <div className="col-lg-4 col-md-6">
              {/* Pricing Item Start  */}
              <div className="pricing-item wow fadeInUp" data-wow-delay="1.0s">
                <div className="pricing-info">
                  <h3>Shampoo & Set</h3>
                  <p>
                    It has been a really long time, and it hasn’t been easy without your happy faces after a good day at the salon.
Some of you kept it interesting with attempts at self-grooming, and we loved it.
But we’re back now, ready to pamper you again.
                  </p>
                </div>

                <div className="pricing-price">
                  <p>$59</p>
                </div>
              </div>
              {/* Pricing Item End  */}
            </div>

            <div className="col-lg-4 col-md-6">
              {/* Pricing Item Start  */}
              <div className="pricing-item wow fadeInUp" data-wow-delay="1.25s">
                <div className="pricing-info">
                  <h3>Men's Haircut</h3>
                  <p>
                    It has been a really long time, and it hasn’t been easy without your happy faces after a good day at the salon.
Some of you kept it interesting with attempts at self-grooming, and we loved it.
But we’re back now, ready to pamper you again.
                  </p>
                </div>

                <div className="pricing-price">
                  <p>$32</p>
                </div>
              </div>
              {/* Pricing Item End  */}
            </div>

            <div className="col-lg-4 col-md-6">
              {/* Pricing Item Start  */}
              <div className="pricing-item wow fadeInUp" data-wow-delay="1.50s">
                <div className="pricing-info">
                  <h3>Hair Highlights</h3>
                  <p>
                    It has been a really long time, and it hasn’t been easy without your happy faces after a good day at the salon.
Some of you kept it interesting with attempts at self-grooming, and we loved it.
But we’re back now, ready to pamper you again.
                  </p>
                </div>

                <div className="pricing-price">
                  <p>$24</p>
                </div>
              </div>
              {/* Pricing Item End  */}
            </div>

            <div className="col-lg-4 col-md-6">
              {/* Pricing Item Start  */}
              <div className="pricing-item wow fadeInUp" data-wow-delay="1.75s">
                <div className="pricing-info">
                  <h3>Natural Color</h3>
                  <p>
                    It has been a really long time, and it hasn’t been easy without your happy faces after a good day at the salon.
Some of you kept it interesting with attempts at self-grooming, and we loved it.
But we’re back now, ready to pamper you again.
                  </p>
                </div>

                <div className="pricing-price">
                  <p>$29</p>
                </div>
              </div>
              {/* Pricing Item End  */}
            </div>

            <div className="col-lg-4 col-md-6">
              {/* Pricing Item Start  */}
              <div className="pricing-item wow fadeInUp" data-wow-delay="2.00s">
                <div className="pricing-info">
                  <h3>Eyebrow Shaping</h3>
                  <p>
                    It has been a really long time, and it hasn’t been easy without your happy faces after a good day at the salon.
Some of you kept it interesting with attempts at self-grooming, and we loved it.
But we’re back now, ready to pamper you again.
                  </p>
                </div>

                <div className="pricing-price">
                  <p>$39</p>
                </div>
              </div>
              {/* Pricing Item End  */}
            </div>

            <div className="col-lg-4 col-md-6">
              {/* Pricing Item Start  */}
              <div className="pricing-item wow fadeInUp" data-wow-delay="2.25s">
                <div className="pricing-info">
                  <h3>Eyelash Tinting</h3>
                  <p>
                    It has been a really long time, and it hasn’t been easy without your happy faces after a good day at the salon.
Some of you kept it interesting with attempts at self-grooming, and we loved it.
But we’re back now, ready to pamper you again.
                  </p>
                </div>

                <div className="pricing-price">
                  <p>$19</p>
                </div>
              </div>
              {/* Pricing Item End  */}
            </div>

            <div className="col-lg-4 col-md-6">
              {/* Pricing Item Start  */}
              <div className="pricing-item wow fadeInUp" data-wow-delay="2.50s">
                <div className="pricing-info">
                  <h3>Organic Facial</h3>
                  <p>
                    It has been a really long time, and it hasn’t been easy without your happy faces after a good day at the salon.
Some of you kept it interesting with attempts at self-grooming, and we loved it.
But we’re back now, ready to pamper you again.
                  </p>
                </div>

                <div className="pricing-price">
                  <p>$49</p>
                </div>
              </div>
              {/* Pricing Item End  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceList;
