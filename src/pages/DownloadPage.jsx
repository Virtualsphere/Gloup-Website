import React from "react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";
import {
  HomeScreenS,
  ShopDetailsScreenS,
  BookingConfirmedS,
} from "../assets/images";
const DownloadPage = () => {
  return (
    <section
      className="py-5 px-3"
      style={{
        background: "linear-gradient(to bottom right, #fff0f6, #f3e8ff)",
      }}
    >
      <div className="container text-center">
        <h1 className="display-4 fw-bold text-dark mb-4">
          Book Your Perfect
          <span className="text-gradient bg-pink-purple mx-2">Salon</span>
          Experience
        </h1>

        <p
          className="lead text-secondary mb-5 mx-auto"
          style={{ maxWidth: "650px" }}
        >
          Discover, book, and manage your salon appointments with ease. Connect
          with top-rated salons in your area and never miss your beauty routine
          again.
        </p>

        {/* Buttons */}
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-5">
          {/* Website Button */}
          <a
            href="https://gloup.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark d-flex align-items-center px-4 py-2 shadow"
          >
            <AiOutlineGlobal size={24} className="me-2" />
            <div className="text-start">
              <div className="small text-light">Visit our</div>
              <div className="fw-semibold">Website</div>
            </div>
          </a>

          {/* Google Play Button */}
          <a
            href="https://play.google.com/store/apps/details?id=com.gloup.userapp"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark d-flex align-items-center px-4 py-2 shadow"
          >
            <IoLogoGooglePlaystore size={24} className="me-2" />
            <div className="text-start">
              <div className="small text-light">Get it on</div>
              <div className="fw-semibold">Google Play</div>
            </div>
          </a>
        </div>

        {/* App Screenshots */}
        <div className="mt-5">
          <h2 className="h3 fw-bold text-dark mb-4">Experience Our App</h2>
          <div className="row g-4 justify-content-center">
            {/* Card 1 */}
            <div className="col-12 col-md-4">
              <div className="card border-0 shadow h-100">
                <img
                  src={HomeScreenS}
                  alt="Home Screen"
                  className="card-img-top rounded-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold">Discover Salons</h5>
                  <p className="card-text text-muted">
                    Browse through top-rated salons and find your perfect match
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-12 col-md-4">
              <div className="card border-0 shadow h-100">
                <img
                  src={ShopDetailsScreenS}
                  alt="Shop Details"
                  className="card-img-top rounded-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold">Explore Services</h5>
                  <p className="card-text text-muted">
                    View detailed information about services, prices, and
                    availability
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-12 col-md-4">
              <div className="card border-0 shadow h-100">
                <img
                  src={BookingConfirmedS}
                  alt="Booking Confirmed"
                  className="card-img-top rounded-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold">Easy Booking</h5>
                  <p className="card-text text-muted">
                    Book appointments instantly and get confirmation right away
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadPage;
