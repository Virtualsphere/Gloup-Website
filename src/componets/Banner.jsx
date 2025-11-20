import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bannerImage } from "../assets/images";
import "../styles/custom.css";
import "../styles/all.mim.css"; 
import "../styles/animate.css";
import "../styles/bootstrap.min.css";
import "../styles/magnific-popup.css";
import "../styles/slicknav.min.css";
import "../styles/swiper-bundle.min.css";


const Banner = () => {
 


  return (
    <div className="hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            {/* Hero Left Content Start  */}
            <div className="hero-content">
              <div className="section-title">
                <h3 className="wow fadeInUp">Welcome to GloUp</h3>

                <h1 class="text-anime wow fadeInUp">
                  Discover You Unique <br />& New Style
                </h1>
              </div>
              <div
                className="hero-content-body wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <p>
                  We believe that your hair is an expression of your
                  personality. Our skilled stylists are here to help you unleash
                  your true style potential.
                </p>
                <ul>
                  <li>01. Get Hair Style You Deserve</li>
                  <li>02. Perfect Hair Style</li>
                </ul>
              </div>

              {/* <div
                className="hero-content-footer wow fadeInUp"
                data-wow-delay="0.75s"
              >
                <Link to="#" className="btn-default dark-bg">
                  Book Now
                </Link>
                <Link to="#" className="btn-default dark-bg">
                  Contact Now
                </Link>
              </div> */}
            </div>
            {/* Hero Left Content End */}
          </div>

          <div className="col-lg-6">
            {/* Hero Image Start  */}
            <div className="hero-image wow fadeInUp" data-wow-delay="0.75s">
              <figure className="hover-anime">
                <img src={bannerImage} alt="" />
              </figure>
            </div>
            {/* Hero Image End  */}
          </div>
        </div>

        {/* Hero Scroll Down Arrow Start  */}
        {/* <div className="row">
          <div className="col-md-12 scrollsp">
            <a href="#aboutus" className="scroll-down">
              <span></span>
            </a>
          </div>
        </div> */}
        {/* Hero Scroll Down Arrow End */}
      </div>
    </div>
  );
};

export default Banner;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBanners } from "../redux/slice/homeSlice";
// import { Swiper, SwiperSlide } from "swiper/react";
// import Loader from "./Loader";
// import { Autoplay } from "swiper/modules"; // Removed Pagination
// import "swiper/css";
// import "../styles/custom.css";

// const Banner = () => {
//   const dispatch = useDispatch();
//   const banner = useSelector((state) => state.home.banner);
//   const loading = useSelector((state) => state.home.loading);

//   useEffect(() => {
//     dispatch(fetchBanners());
//   }, [dispatch]);

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="hero">
//           <div
//             className="container-fluid"
//             style={{ padding: 0 }}
//           >
//             <Swiper
//               modules={[Autoplay]} // Removed Pagination module
//               autoplay={{ delay: 5000 }}
//               loop={true}
//               className="mySwiper"
//             >
//               {banner?.map((item, index) => (
//                 <SwiperSlide key={index}>
//                   <div
//                     className="banner-slide d-flex align-items-center"
//                     style={{
//                       backgroundImage: `url(${
//                         item?.image
//                           ? `${import.meta.env.VITE_API_BASE_URL}/profilepic/${
//                               item.image
//                             }`
//                           : "/placeholder.jpg"
//                       })`,
//                       backgroundSize: "cover",
//                       backgroundPosition: "center",
//                       height: "100vh",
//                       color: "#fff",
//                     }}
//                   >
//                     <div
//                       className="container"
//                       style={{ padding: "0px !important" }}
//                     >
//                       <div className="row">
//                         <div className="col-lg-6">
//                           <div className="hero-content">
//                             <div className="section-title">
//                               <h3 className="wow fadeInUp">Welcome to GloUp</h3>
//                               <h1 className="text-anime wow fadeInUp">
//                                 {item?.title || "Discover Your Unique Style"}
//                               </h1>
//                             </div>
//                             <div
//                               className="hero-content-body wow fadeInUp"
//                               data-wow-delay="0.5s"
//                             >
//                               <p>
//                                 {item?.description ||
//                                   "Your hair, your identity."}
//                               </p>
//                               <ul>
//                                 <li>01. Get Hair Style You Deserve</li>
//                                 <li>02. Perfect Hair Style</li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Banner;
