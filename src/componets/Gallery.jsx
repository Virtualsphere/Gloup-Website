// import React from "react";
// import {
//   galleryImage1,
//   galleryImage2,
//   galleryImage3,
//   galleryImage4,
//   galleryImage5,
//   galleryImage6,
// } from "../assets/images";
// const images = [
//   galleryImage1,
//   galleryImage2,
//   galleryImage3,
//   galleryImage4,
//   galleryImage5,
//   galleryImage6,
// ];
// const Gallery = () => {
//   return (
//     <div className="photo-gallery">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-md-12">
//             {/* Section Title */}
//             <div className="section-title">
//               <h3 className="wow fadeInUp">Photo Gallery</h3>
//               <h2 className="text-anime wow fadeInUp">
//                 Inside Look at Our Salon
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* Photo Gallery */}
//         <div className="row">
//           <div className="col-md-12">
//             <div className="photo-gallery-ticker">
//               <div className="photo-gallery-content">
//                 {/* Duplicate images for smooth looping */}
//                 {[...images, ...images].map((img, index) => (
//                   <div className="photo-gallery-item" key={index}>
//                     <figure className="hover-anime">
//                       <img src={img} alt={`Gallery ${index + 1}`} />
//                     </figure>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gallery;

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import {
//   galleryImage1,
//   galleryImage2,
//   galleryImage3,
//   galleryImage4,
//   galleryImage5,
//   galleryImage6,
// } from "../assets/images";

// const images = [
//   galleryImage1,
//   galleryImage2,
//   galleryImage3,
//   galleryImage4,
//   galleryImage5,
//   galleryImage6,
// ];

// const Gallery = () => {
//   // React Slick settings
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 1000,
//     // cssEase: "linear",
//     pauseOnHover: true,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 576,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="photo-gallery">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-md-12">
//             {/* Section Title */}
//             <div className="section-title">
//               <h3 className="wow fadeInUp">Photo Gallery</h3>
//               <h2 className="text-anime wow fadeInUp">
//                 Inside Look at Our Salon
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* Photo Gallery with React Slick */}
//         <div className="row">
//           <div className="col-md-12">
//             <div className="photo-gallery-slider">
//               <Slider {...settings}>
//                 {images.map((img, index) => (
//                   <div className="photo-gallery-item" key={index}>
//                     <figure className="hover-anime">
//                       <img
//                         src={img || "/placeholder.svg"}
//                         alt={`Gallery ${index + 1}`}
//                       />
//                     </figure>
//                   </div>
//                 ))}
//               </Slider>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gallery;
// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import {
//   galleryImage1,
//   galleryImage2,
//   galleryImage3,
//   galleryImage4,
//   galleryImage5,
//   galleryImage6,
// } from "../assets/images";

// const images = [
//   galleryImage1,
//   galleryImage2,
//   galleryImage3,
//   galleryImage4,
//   galleryImage5,
//   galleryImage6,
// ];

// const Gallery = () => {
//   // React Slick settings
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 1500, // Increased speed for smoother scrolling
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000, // Controls the interval between slides
//     cssEase: "ease-in-out", // Smooth easing for the sliding transition
//     pauseOnHover: true,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 576,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="photo-gallery">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-md-12">
//             {/* Section Title */}
//             <div className="section-title">
//               <h3 className="wow fadeInUp">Photo Gallery</h3>
//               <h2 className="text-anime wow fadeInUp">
//                 Inside Look at Our Salon
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* Photo Gallery with React Slick */}
//         <div className="row">
//           <div className="col-md-12">
//             <div className="photo-gallery-slider">
//               <Slider {...settings}>
//                 {images.map((img, index) => (
//                   <div className="photo-gallery-item" key={index}>
//                     <figure className="hover-anime">
//                       <img
//                         src={img || "/placeholder.svg"}
//                         alt={`Gallery ${index + 1}`}
//                       />
//                     </figure>
//                   </div>
//                 ))}
//               </Slider>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gallery;

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import {
  galleryImage1,
  galleryImage2,
  galleryImage3,
  galleryImage4,
  galleryImage5,
  galleryImage6,
} from "../assets/images";

const images = [
  galleryImage1,
  galleryImage2,
  galleryImage3,
  galleryImage4,
  galleryImage5,
  galleryImage6,
];

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} gallery-arrow gallery-arrow-prev`}
      onClick={onClick}
      aria-label="Previous slide"
    >
      <MdOutlineKeyboardArrowLeft size={24} />
    </button>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} gallery-arrow gallery-arrow-next`}
      onClick={onClick}
      aria-label="Next slide"
    >
      <MdOutlineKeyboardArrowRight size={24} />
    </button>
  );
};

const Gallery = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="photo-gallery">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {/* Section Title */}
            <div className="section-title">
              <h3 className="wow fadeInUp">Photo Gallery</h3>
              <h2 className="text-anime wow fadeInUp">
                Inside Look at Our Salon
              </h2>
            </div>
          </div>
        </div>

        {/* Photo Gallery with React Slick */}
        <div className="row">
          <div className="col-md-12" style={{ overflow: "hidden" }}>
            <div className="photo-gallery-slider">
              <Slider {...settings}>
                {images.map((img, index) => (
                  <div className="photo-gallery-item" key={index}>
                    <figure className="hover-anime">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Gallery ${index + 1}`}
                      />
                    </figure>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
