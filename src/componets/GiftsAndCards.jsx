import React from "react";
import { giftImage1, giftImage2 } from "../assets/images";

const GiftsAndCards = () => {
  return <div>
      <div className="gift-cards">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
             {/* Section Title Start */}
            <div className="section-title">
              <h3 className="wow fadeInUp">Gifts & Cards</h3>
              <h2 className="text-anime wow fadeInUp">Special Gifts & Cards</h2>
            </div>
             {/* Section Title End */}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
             {/* Gift Offer Box Start */}
            <div className="gift-box">
              <div className="gift-content wow fadeInUp" data-wow-delay="0.5s">
                <h3>Hair Cut</h3>
                <p>
                It has been a really long time, and it hasn’t been easy without your happy faces after a good day at the salon.
Some of you kept it interesting with attempts at self-grooming, and we loved it.
But we’re back now, ready to pamper you again.
                </p>
                <a href="#" className="btn-default">Get Now</a>
              </div>

              <div className="gift-image wow fadeInUp" data-wow-delay="0.75s">
                <img src={giftImage1} alt="" />
              </div>
            </div> {/* Gift Offer Box */}
          </div>

          <div className="col-lg-6">
             {/* Gift Offer Box Start */}
            <div className="gift-box left-shape">
              <div className="gift-content wow fadeInUp" data-wow-delay="0.5s">
                <h3>Hair Coloring</h3>
                <p>
                 It has been a really long time, and it hasn’t been easy without your happy faces after a good day at the salon.
Some of you kept it interesting with attempts at self-grooming, and we loved it.
But we’re back now, ready to pamper you again.
                </p>
                <a href="#" className="btn-default">Get Now</a>
              </div>

              <div className="gift-image wow fadeInUp" data-wow-delay="1s">
                <img src={giftImage2} alt="" />
              </div>
            </div>
             {/* Gift Offer Box End */}
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default GiftsAndCards;
