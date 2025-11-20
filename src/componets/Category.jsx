// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import {
//   MdOutlineKeyboardArrowLeft,
//   MdOutlineKeyboardArrowRight,
// } from "react-icons/md";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { shopCategory } from "../redux/slice/categorySlice";

// const PrevArrow = (props) => {
//   const { className, onClick } = props;
//   return (
//     <button
//       className={`${className} gallery-arrow gallery-arrow-prev`}
//       onClick={onClick}
//       aria-label="Previous slide"
//     >
//       <MdOutlineKeyboardArrowLeft size={24} />
//     </button>
//   );
// };

// const NextArrow = (props) => {
//   const { className, onClick } = props;
//   return (
//     <button
//       className={`${className} gallery-arrow gallery-arrow-next`}
//       onClick={onClick}
//       aria-label="Next slide"
//     >
//       <MdOutlineKeyboardArrowRight size={24} />
//     </button>
//   );
// };

// const Category = () => {
//   const dispatch = useDispatch();
//   const categories = useSelector((state) => state.category.allCategory);

//   const loading = useSelector((state) => state.category.loading);

//   useEffect(() => {
//     dispatch(shopCategory());
//   }, [dispatch]);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 1500,
//     slidesToShow: 7,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     cssEase: "ease-in-out",
//     pauseOnHover: true,
//     prevArrow: <PrevArrow />,
//     nextArrow: <NextArrow />,
//     responsive: [
//       { breakpoint: 1200, settings: { slidesToShow: 3 } },
//       { breakpoint: 992, settings: { slidesToShow: 3 } },
//       { breakpoint: 576, settings: { slidesToShow: 3 } },
//       { breakpoint: 430, settings: { slidesToShow: 2 } },
//     ],
//   };

//   return (
// //    <div className="photo-gallery py-5">
// //   <div className="container-fluid px-3 px-md-4">
// //     <div className="row justify-content-center text-center mb-4">
// //       <div className="col-lg-8">
// //         <div className="section-title">
// //           <h3 className="wow fadeInUp">Category</h3>
// //           <h2 className="text-anime wow fadeInUp">
// //             Explore Our Signature Styles & Inspirations
// //           </h2>
// //         </div>
// //       </div>
// //     </div>

// //     <div className="row justify-content-center">
// //       <div
// //         className="col-12"
// //         style={{
// //           maxWidth: "1300px",
// //           margin: "0 auto",
// //           overflow: "hidden",
// //         }}
// //       >
// //         <div className="photo-gallery-slider px-2 px-md-3">
// //           <Slider {...settings}>
// //             {categories?.map((item, index) => (
// //               <Link to="/shoplist" key={index}>
// //                 <div className="photo-gallery-item px-2">
// //                   <img
// //                     src="https://t4.ftcdn.net/jpg/01/30/24/33/360_F_130243330_SNm4Rtx2y0O2rxemmdun9H6PyNGncfgu.jpg"
// //                     alt={item.name || "Category"}
// //                     className="img-fluid rounded"
// //                     style={{
// //                       width: "100%",
// //                       height: "180px",
// //                       objectFit: "cover",
// //                     }}
// //                   />
// //                   <div className="photo-gallery-caption mt-2">
// //                     <h6 className="text-center text-dark fw-semibold">
// //                       {item.name}
// //                     </h6>
// //                   </div>
// //                 </div>
// //               </Link>
// //             ))}
// //           </Slider>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // </div>

//     <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <div className="inline-block">
//             <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-sm font-semibold uppercase tracking-wider rounded-full mb-4">
//               Category
//             </span>
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
//               Explore Our Signature
//             </h2>
//             <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-600 mb-6">Styles & Inspirations</h3>
//             <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
//           </div>
//         </div>

//         {/* Category Slider */}
//         <div className="relative px-4 md:px-8">
//           {/* Navigation Arrows */}
//           {categories.length > itemsPerView && (
//             <>
//               <button
//                 className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg border border-gray-200 -ml-2 md:-ml-6 w-10 h-10 md:w-12 md:h-12 rounded-full hidden sm:flex items-center justify-center transition-all duration-200 hover:shadow-xl hover:scale-105"
//                 onClick={prevSlide}
//                 aria-label="Previous slide"
//               >
//                 <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
//               </button>

//               <button
//                 className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg border border-gray-200 -mr-2 md:-mr-6 w-10 h-10 md:w-12 md:h-12 rounded-full hidden sm:flex items-center justify-center transition-all duration-200 hover:shadow-xl hover:scale-105"
//                 onClick={nextSlide}
//                 aria-label="Next slide"
//               >
//                 <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
//               </button>
//             </>
//           )}

//           {/* Slider Container */}
//           <div
//             ref={sliderRef}
//             className="overflow-hidden rounded-xl"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             onTouchStart={onTouchStart}
//             onTouchMove={onTouchMove}
//             onTouchEnd={onTouchEnd}
//           >
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{
//                 transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
//               }}
//             >
//               {categories.map((category) => (
//                 <div key={category.id} className="flex-shrink-0 px-2" style={{ width: `${100 / itemsPerView}%` }}>
//                   {/* Card Component */}
//                   <div
//                     className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white h-full rounded-lg"
//                     onClick={() => handleCategoryClick(category)}
//                   >
//                     <div className="p-0 h-full flex flex-col">
//                       {/* Image Container */}
//                       <div className="relative overflow-hidden flex-shrink-0 rounded-t-lg">
//                         <img
//                           src={category.image || "/placeholder.svg?height=250&width=350&text=Category"}
//                           alt={category.name}
//                           className="w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-700 group-hover:scale-110"
//                           loading="lazy"
//                         />

//                         {/* Overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

//                         {/* Hover Content */}
//                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
//                           <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
//                             <p className="text-sm font-medium mb-2 px-4">{category.description}</p>
//                             <div className="w-12 h-0.5 bg-white mx-auto"></div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Content */}
//                       <div className="p-4 md:p-6 bg-white flex-grow flex flex-col justify-center rounded-b-lg">
//                         <h6 className="text-center font-bold text-gray-800 text-base md:text-lg group-hover:text-blue-600 transition-colors duration-300 mb-2">
//                           {category.name}
//                         </h6>
//                         <p className="text-center text-gray-500 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
//                           {category.description}
//                         </p>
//                       </div>

//                       {/* Bottom Border Animation */}
//                       <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-lg"></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           <div className="flex justify-center gap-2 mt-6 sm:hidden">
//             <button
//               className="px-4 py-2 border border-gray-300 rounded-lg bg-transparent hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1 text-sm font-medium text-gray-700"
//               onClick={prevSlide}
//             >
//               <ChevronLeft className="h-4 w-4" />
//               Prev
//             </button>
//             <button
//               className="px-4 py-2 border border-gray-300 rounded-lg bg-transparent hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1 text-sm font-medium text-gray-700"
//               onClick={nextSlide}
//             >
//               Next
//               <ChevronRight className="h-4 w-4" />
//             </button>
//           </div>

//           {/* Dots Indicator */}
//           {categories.length > itemsPerView && (
//             <div className="flex justify-center gap-2 mt-8">
//               {Array.from({ length: maxIndex + 1 }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     currentIndex === index ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Additional Info */}
//         <div className="text-center mt-16">
//           <p className="text-gray-600 text-lg mb-6">
//             Discover our carefully curated collections designed for every occasion
//           </p>
//           <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
//             View All Categories
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Category;

// // import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// // import {
// //   MdOutlineKeyboardArrowLeft,
// //   MdOutlineKeyboardArrowRight,
// // } from "react-icons/md";
// // import {
// //   galleryImage1,
// //   galleryImage2,
// //   galleryImage3,
// //   galleryImage4,
// //   galleryImage5,
// //   galleryImage6,
// // } from "../assets/images";

// // const images = [
// //   galleryImage1,
// //   galleryImage2,
// //   galleryImage3,
// //   galleryImage4,
// //   galleryImage5,
// //   galleryImage6,
// // ];

// // const PrevArrow = (props) => {
// //   const { className, onClick } = props;
// //   return (
// //     <button
// //       className={`${className} gallery-arrow gallery-arrow-prev`}
// //       onClick={onClick}
// //       aria-label="Previous slide"
// //     >
// //       <MdOutlineKeyboardArrowLeft size={24} />
// //     </button>
// //   );
// // };

// // const NextArrow = (props) => {
// //   const { className, onClick } = props;
// //   return (
// //     <button
// //       className={`${className} gallery-arrow gallery-arrow-next`}
// //       onClick={onClick}
// //       aria-label="Next slide"
// //     >
// //       <MdOutlineKeyboardArrowRight size={24} />
// //     </button>
// //   );
// // };

// // const Gallery = () => {
// //   const settings = {
// //     dots: false,
// //     infinite: true,
// //     speed: 1500,
// //     slidesToShow: 5,
// //     slidesToScroll: 1,
// //     autoplay: true,
// //     autoplaySpeed: 2000,
// //     cssEase: "ease-in-out",
// //     pauseOnHover: true,
// //     // prevArrow: <PrevArrow />,
// //     // nextArrow: <NextArrow />,
// //     responsive: [
// //       {
// //         breakpoint: 1200,
// //         settings: {
// //           slidesToShow: 3,
// //         },
// //       },
// //       {
// //         breakpoint: 992,
// //         settings: {
// //           slidesToShow: 3,
// //         },
// //       },
// //       {
// //         breakpoint: 576,
// //         settings: {
// //           slidesToShow: 3,
// //         },
// //       },
// //       {
// //         breakpoint: 430,
// //         settings: {
// //           slidesToShow: 2,
// //         },
// //       },
// //     ],
// //   };

// //   return (
// //     <div className="photo-gallery">
// //       <div className="container-fluid">
// //         <div className="row">
// //           <div className="col-md-12">
// //             {/* Section Title */}
// //             <div className="section-title">
// //               <h3 className="wow fadeInUp">Category</h3>
// //               <h2 className="text-anime wow fadeInUp">
// //                 Explore Our Signature Styles & Inspirations
// //               </h2>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Photo Gallery with React Slick */}
// //         <div className="row">
// //           <div className="col-md-12" style={{ overflow: "hidden" }}>
// //             <div className="photo-gallery-slider">
// //               <Slider {...settings}>
// //                 {images.map((img, index) => (
// //                   <div className="photo-gallery-item" key={index}>
// //                     <figure className="hover-anime">
// //                       <img
// //                         src={img || "/placeholder.svg"}
// //                         alt={`Gallery ${index + 1}`}
// //                       />
// //                     </figure>
// //                   </div>
// //                 ))}
// //               </Slider>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Gallery;

import React, { useEffect } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { shopCategory } from "../redux/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Sample category data
const mockCategories = [
  {
    id: 1,
    name: "Summer Collection",
    image:
      "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description: "Light and breezy styles",
  },
  {
    id: 2,
    name: "Winter Essentials",
    image: "/placeholder.svg?height=250&width=350&text=Winter+Essentials",
    description: "Cozy and warm clothing",
  },
  {
    id: 3,
    name: "Casual Wear",
    image: "/placeholder.svg?height=250&width=350&text=Casual+Wear",
    description: "Everyday comfort",
  },
  {
    id: 4,
    name: "Formal Attire",
    image: "/placeholder.svg?height=250&width=350&text=Formal+Attire",
    description: "Professional elegance",
  },
  {
    id: 5,
    name: "Sports & Active",
    image: "/placeholder.svg?height=250&width=350&text=Sports+Active",
    description: "Performance wear",
  },
  {
    id: 6,
    name: "Accessories",
    image: "/placeholder.svg?height=250&width=350&text=Accessories",
    description: "Complete your look",
  },
];

// Custom Arrows
const NextArrow = ({ onClick }) => (
  <button
    className="btn btn-light border rounded-circle position-absolute top-50 end-0 translate-middle-y d-none d-sm-flex align-items-center justify-content-center"
    style={{ zIndex: 1, width: "44px", height: "44px" }}
    onClick={onClick}
  >
    <ChevronRight size={20} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="btn btn-light border rounded-circle position-absolute top-50 start-0 translate-middle-y d-none d-sm-flex align-items-center justify-content-center"
    style={{ zIndex: 1, width: "44px", height: "44px" }}
    onClick={onClick}
  >
    <ChevronLeft size={20} />
  </button>
);

export default function CategoryGallery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  useEffect(() => {
    dispatch(shopCategory());
  }, [dispatch]);
  let category = useSelector((state) => state.category.allCategory);

  return (
    <section className="py-5 bg-light">
      <div className="container position-relative">
        <div className="row">
          <div className="col-md-12">
            {/* Section Title */}
            <div className="section-title" style={{marginBottom:"15px"}}>
              <h3 className="wow fadeInUp">Category</h3>
              {/* <h2 className="text-anime wow fadeInUp">
                Explore Our Signature Styles & Inspirations
              </h2> */}
            </div>
          </div>
        </div>
        {
          <Slider {...settings}>
            {category.map((category) => (
              <div
                key={category.id}
                className="col-12 col-sm-4 col-md-8 col-lg-8 px-2 d-flex justify-content-center"
              >
                <div
                  className="card h-100"
                  style={{
                    border: "none",
                    background: "transparent",
                    width: "100%",
                    maxWidth: "200px", // you can tweak this size
                  }}
                >
                  {/* 1:1 Image Wrapper */}
                  <div
                    className="position-relative w-100"
                    style={{
                      paddingTop: "100%",
                      borderRadius: "800px 800px 800px 50px",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/categoryshoplist/${category.id}`)}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/profilepic/${
                        category.image
                      }`}
                      alt={category.name}
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        objectFit: "cover",
                        borderRadius: "800px 800px 800px 50px",
                      }}
                    />
                  </div>

                  <div className="card-body text-center p-2">
                    <h6
                      className="card-title mb-1"
                      style={{ fontSize: "18px" }}
                    >
                      {category.name}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        }
      </div>
    </section>
  );
}
