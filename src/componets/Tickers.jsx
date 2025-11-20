import React from "react";
import { tickerImage } from "../assets/images";
import "../styles/custom.css";
import "../styles/all.mim.css";
import "../styles/animate.css";
import "../styles/bootstrap.min.css";
import "../styles/magnific-popup.css";
import "../styles/slicknav.min.css";
import "../styles/swiper-bundle.min.css";
const Tickers = () => {
  return (
    <div className="features-ticker">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {/* Features Ticker Start  */}
            <div className="feature-ticker-box">
              <div className="feature-ticker-content">
                <ul>
                  <li>
                    <img src={tickerImage} alt="" /> Hair Cut
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Hair Dryer
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Hair Style
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Hair Coloring
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Shaving
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Organic Facial
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Eybrow Shaping
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Natural Color
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Eyelash Tinting
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Hair Highter
                  </li>
                </ul>
              </div>

              <div className="feature-ticker-content">
                <ul>
                  <li>
                    <img src={tickerImage} alt="" /> Hair Cut
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Hair Dryer
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Hair Style
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Hair Coloring
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Shaving
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Organic Facial
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Eybrow Shaping
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Natural Color
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Eyelash Tinting
                  </li>
                  <li>
                    <img src={tickerImage} alt="" /> Hair Highter
                  </li>
                </ul>
              </div>
            </div>
            {/* Features Ticker End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickers;
