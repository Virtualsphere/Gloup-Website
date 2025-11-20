import React from "react";
import {
  testimonialImage1,
  testimonialImage2,
  ratingImage,
} from "../assets/images";
// import { useTestimonialSwiper } from "../hooks/customSwiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/custom.css";
import "../styles/all.mim.css";
import "../styles/animate.css";
import "../styles/bootstrap.min.css";
import "../styles/magnific-popup.css";
import "../styles/slicknav.min.css";
import "../styles/swiper-bundle.min.css";

const Testimonial = () => {
  //   useTestimonialSwiper();
  return (
    <div>
      {" "}
      {
        //   <div className="testimonials">
        //     <div className="container">
        //       <div className="row">
        //         <div className="col-md-12">
        //           {/* Section Title Start  */}
        //           <div className="section-title">
        //             <h3 className="wow fadeInUp">Client Testimonials</h3>
        //             <h2 className="text-anime">What Our Client Say</h2>
        //           </div>
        //           {/* Section Title End  */}
        //         </div>
        //       </div>
        //       <div className="row">
        //         <div className="col-md-12">
        //           {/* Testimonial Carousel Start */}
        //           <div className="testimonial-carousel">
        //             <div className="swiper">
        //               <div className="swiper-wrapper">
        //                 {/* Testimonial Slide Start */}
        //                 <div className="swiper-slide">
        //                   <div className="testimonial-slide">
        //                     <div className="testimonial-header">
        //                       <div className="author-img">
        //                         <img src={testimonialImage1} alt="" />
        //                       </div>
        //                       <div className="author-info">
        //                         <h3>Emma Johnson</h3>
        //                         <div className="rating-star">
        //                           <img src={ratingImage} alt="" />
        //                         </div>
        //                       </div>
        //                     </div>
        //                     <div className="testimonial-content">
        //                       <p>
        //                         Lorem ipsum dolor sit amet, consectetur adipiscing
        //                         elit, sed do eiusmod tempor incididunt ut labore et
        //                         dolore magna aliqua. Ut enim ad minim veniam, quis
        //                         nostrud exercitation ullamco laboris nisi ut aliquip
        //                         ex ea commodo consequat. Duis aute irure dolor in
        //                         reprehenderit in voluptate velit esse cillum dolore
        //                         eu fugiat nulla pariatur.
        //                       </p>
        //                     </div>
        //                   </div>
        //                 </div>
        //                 {/* Testimonial Slide End */}
        //                 {/* Testimonial Slide Start */}
        //                 <div className="swiper-slide">
        //                   <div className="testimonial-slide">
        //                     <div className="testimonial-header">
        //                       <div className="author-img">
        //                         <img src={testimonialImage2} alt="" />
        //                       </div>
        //                       <div className="author-info">
        //                         <h3>Olivia Davis</h3>
        //                         <div className="rating-star">
        //                           <img src={ratingImage} alt="" />
        //                         </div>
        //                       </div>
        //                     </div>
        //                     <div className="testimonial-content">
        //                       <p>
        //                         Lorem ipsum dolor sit amet, consectetur adipiscing
        //                         elit, sed do eiusmod tempor incididunt ut labore et
        //                         dolore magna aliqua. Ut enim ad minim veniam, quis
        //                         nostrud exercitation ullamco laboris nisi ut aliquip
        //                         ex ea commodo consequat. Duis aute irure dolor in
        //                         reprehenderit in voluptate velit esse cillum dolore
        //                         eu fugiat nulla pariatur.
        //                       </p>
        //                     </div>
        //                   </div>
        //                 </div>
        //                 {/* Testimonial Slide End */}
        //                 {/* Testimonial Slide Start */}
        //                 <div className="swiper-slide">
        //                   <div className="testimonial-slide">
        //                     <div className="testimonial-header">
        //                       <div className="author-img">
        //                         <img src={testimonialImage1} alt="" />
        //                       </div>
        //                       <div className="author-info">
        //                         <h3>Emma Johnson</h3>
        //                         <div className="rating-star">
        //                           <img src={ratingImage} alt="" />
        //                         </div>
        //                       </div>
        //                     </div>
        //                     <div className="testimonial-content">
        //                       <p>
        //                         Lorem ipsum dolor sit amet, consectetur adipiscing
        //                         elit, sed do eiusmod tempor incididunt ut labore et
        //                         dolore magna aliqua. Ut enim ad minim veniam, quis
        //                         nostrud exercitation ullamco laboris nisi ut aliquip
        //                         ex ea commodo consequat. Duis aute irure dolor in
        //                         reprehenderit in voluptate velit esse cillum dolore
        //                         eu fugiat nulla pariatur.
        //                       </p>
        //                     </div>
        //                   </div>
        //                 </div>
        //                 {/* Testimonial Slide End */}
        //                 {/* Testimonial Slide Start  */}
        //                 <div className="swiper-slide">
        //                   <div className="testimonial-slide">
        //                     <div className="testimonial-header">
        //                       <div className="author-img">
        //                         <img src={testimonialImage2} alt="" />
        //                       </div>
        //                       <div className="author-info">
        //                         <h3>Olivia Davis</h3>
        //                         <div className="rating-star">
        //                           <img src={ratingImage} alt="" />
        //                         </div>
        //                       </div>
        //                     </div>
        //                     <div className="testimonial-content">
        //                       <p>
        //                         Lorem ipsum dolor sit amet, consectetur adipiscing
        //                         elit, sed do eiusmod tempor incididunt ut labore et
        //                         dolore magna aliqua. Ut enim ad minim veniam, quis
        //                         nostrud exercitation ullamco laboris nisi ut aliquip
        //                         ex ea commodo consequat. Duis aute irure dolor in
        //                         reprehenderit in voluptate velit esse cillum dolore
        //                         eu fugiat nulla pariatur.
        //                       </p>
        //                     </div>
        //                   </div>
        //                 </div>
        //                 {/* Testimonial Slide End */}
        //               </div>
        //               <div className="swiper-pagination"></div>
        //             </div>
        //           </div>
        //           {/* Testimonial Carousel End */}
        //         </div>
        //       </div>
        //     </div>
        //   </div>
      }
      <div className="testimonials">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title">
                <h3 className="wow fadeInUp">Client Testimonials</h3>
                <h2 className="text-anime wow fadeInUp">What Our Client Say</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="testimonial-carousel">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={30}
                  speed={1000}
                  loop={true}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    991: {
                      slidesPerView: 2,
                    },
                  }}
                >
                  <SwiperSlide>
                    <div className="testimonial-slide">
                      <div className="testimonial-header">
                        <div className="author-img">
                          <img src={testimonialImage1} alt="Emma Johnson" />
                        </div>
                        <div className="author-info">
                          <h3>Emma Johnson</h3>
                          <div className="rating-star">
                            <img src={ratingImage} alt="Stars" />
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p>
                        It has been a really long time, and it hasn’t been easy without your happy faces after a good day at the salon.
Some of you kept it interesting with attempts at self-grooming, and we loved it.
But we’re back now, ready to pamper you again.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="testimonial-slide">
                      <div className="testimonial-header">
                        <div className="author-img">
                          <img src={testimonialImage2} alt="Olivia Davis" />
                        </div>
                        <div className="author-info">
                          <h3>Olivia Davis</h3>
                          <div className="rating-star">
                            <img src={ratingImage} alt="Stars" />
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="testimonial-slide">
                      <div className="testimonial-header">
                        <div className="author-img">
                          <img src={testimonialImage2} alt="Olivia Davis" />
                        </div>
                        <div className="author-info">
                          <h3>Olivia Davis</h3>
                          <div className="rating-star">
                            <img src={ratingImage} alt="Stars" />
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="testimonial-slide">
                      <div className="testimonial-header">
                        <div className="author-img">
                          <img src={testimonialImage2} alt="Olivia Davis" />
                        </div>
                        <div className="author-info">
                          <h3>Olivia Davis</h3>
                          <div className="rating-star">
                            <img src={ratingImage} alt="Stars" />
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="testimonial-slide">
                      <div className="testimonial-header">
                        <div className="author-img">
                          <img src={testimonialImage2} alt="Olivia Davis" />
                        </div>
                        <div className="author-info">
                          <h3>Olivia Davis</h3>
                          <div className="rating-star">
                            <img src={ratingImage} alt="Stars" />
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="testimonial-slide">
                      <div className="testimonial-header">
                        <div className="author-img">
                          <img src={testimonialImage2} alt="Olivia Davis" />
                        </div>
                        <div className="author-info">
                          <h3>Olivia Davis</h3>
                          <div className="rating-star">
                            <img src={ratingImage} alt="Stars" />
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Add more SwiperSlide blocks if needed */}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
