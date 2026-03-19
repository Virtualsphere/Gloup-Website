import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { Mars, Venus, VenusAndMars } from "lucide-react";
import {
  MdOutlineStarHalf,
  MdStarOutline,
  MdStar,
  MdLocationOn,
  MdOutlineKeyboardArrowDown,
  MdStoreMallDirectory,
} from "react-icons/md";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addFavourites } from "../redux/slice/favouritesSlice";

function TopSalons({ topsalons = [], setIsHitFavourite }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [localFavs, setLocalFavs] = useState({});

  // 🔁 Keep local state in sync when the nearby list changes
  useEffect(() => {
    const map = {};
    topsalons.forEach((shop) => {
      map[shop.id] = shop.is_favourite;
    });
    setLocalFavs(map);
  }, [topsalons]);

  const renderStars = (rating, size = 20) => {
    const safeRating = Math.min(Math.max(Number(rating) || 0, 0), 5); // Clamp between 0 and 5
    const roundedRating = Math.ceil(safeRating);
    const totalStars = 5;

    return (
      <>
        {[...Array(roundedRating)].map((_, i) => (
          <MdStar key={`full-${i}`} style={{ fontSize: `${size}px` }} />
        ))}
        {[...Array(totalStars - roundedRating)].map((_, i) => (
          <MdStarOutline key={`empty-${i}`} style={{ fontSize: `${size}px` }} />
        ))}
      </>
    );
  };

  // const handleFavourite = async (e,id) => {
  //    e.stopPropagation();
  //   try {
  //     const result = await dispatch(addFavourites({ store_id: id })).unwrap();

  //     // Dismiss any previous toast with same ID
  //     toast.dismiss("already-fav");
  //     toast.dismiss("added-fav");
  //     toast.dismiss("generic-fav");

  //     if (result === "Store already in Favourites") {
  //       toast("Store is already in your favourites.", {
  //         id: "already-fav",
  //         icon: "⚠️",
  //       });
  //     } else if (result === "favourites added sucssesfully") {
  //       toast.success("Store added to favourites successfully!", {
  //         id: "added-fav",
  //       });
  //     } else {
  //       toast.success(result, {
  //         id: "generic-fav",
  //       });
  //     }
  //   } catch (error) {
  //     toast.dismiss("error-fav");

  //     toast.error(error?.message || "Failed to add favourite", {
  //       id: "error-fav",
  //     });
  //   }
  // };

  const handleFavourite = async (e, storeId, currentFav) => {
    e.stopPropagation();

    // ✅ 1️⃣ Optimistic UI update — instantly toggle color
    setLocalFavs((prev) => ({
      ...prev,
      [storeId]: !currentFav,
    }));

    try {
      const result = await dispatch(
        addFavourites({ store_id: storeId })
      ).unwrap();

      // Dismiss previous toasts of same category
      toast.dismiss("already-fav");
      toast.dismiss("added-fav");
      toast.dismiss("generic-fav");

      // ✅ 2️⃣ Prepare formatted message
      const message =
        result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();

      // ✅ 3️⃣ Handle toast notifications
      if (result === "Store already in Favourites") {
        toast(message, {
          id: "already-fav",
          icon: "⚠️",
        });
      } else if (result === "favourites added sucssesfully") {
        toast.success(message, {
          id: "added-fav",
        });
      } else {
        toast.success(result, {
          id: "generic-fav",
        });
      }

      // ✅ 4️⃣ Trigger re-fetch in parent after backend updates
      setIsHitFavourite((prev) => !prev);
    } catch (error) {
      toast.dismiss("error-fav");

      toast.error(error?.message || "Failed to add favourite", {
        id: "error-fav",
      });

      // ❌ Revert optimistic update if API fails
      setLocalFavs((prev) => ({
        ...prev,
        [storeId]: currentFav,
      }));
    }
  };
  const swiperRefs = useRef([]);
  return (
    <div className="container-fluid mb-5 px-0 px-sm-4 px-md-0 px-lg-0 px-xl-0">
      {
        // <div class="container-fluid px-0 px-sm-4 px-md-5 px-lg-5 px-xl-5">
        //   <div
        //     className="row d-flex flex-wrap "
        //     style={{ rowGap: "1.5rem", background: "blue" }}
        //   >
        //     {/* {topsalons?.length > 0 && ( */}
        //     <div className="mb-4">
        //       <h2 className="fw-bold text-dark mt-5">Top Salons & Spa</h2>
        //     </div>
        //     {/* )} */}
        //     <div
        //       className="row d-flex flex-wrap"
        //       style={{ rowGap: "1.5rem", background: "red" }}
        //     >
        //       {topsalons?.length > 0 ? (
        //         topsalons.map((service, index) => (
        //           <div className="col-12 col-md-6 col-lg-3 d-flex" key={index}>
        //             <div
        //               className="service-item-layout2 wow fadeInUp d-flex flex-column h-100 w-100"
        //               data-wow-delay={service.delay}
        //             >
        //               {/* Image Section */}
        //               <div
        //                 className="service-image position-relative"
        //                 onMouseEnter={() =>
        //                   swiperRefs.current[index]?.autoplay?.start()
        //                 }
        //                 onMouseLeave={() =>
        //                   swiperRefs.current[index]?.autoplay?.stop()
        //                 }
        //                 onTouchStart={() =>
        //                   swiperRefs.current[index]?.autoplay?.start()
        //                 }
        //                 onTouchEnd={() =>
        //                   swiperRefs.current[index]?.autoplay?.stop()
        //                 }
        //               >
        //                 {service.images.length > 1 ? (
        //                   // <Swiper
        //                   //   modules={[Autoplay]}
        //                   //   loop={true}
        //                   //   speed={700}
        //                   //   slidesPerView={1}
        //                   //   autoplay={{
        //                   //     delay: 1000,
        //                   //     disableOnInteraction: false,
        //                   //   }}
        //                   //   onSwiper={(swiper) => {
        //                   //     swiperRefs.current[index] = swiper;
        //                   //     swiper.autoplay.stop(); // start paused
        //                   //   }}
        //                   // >
        //                   //   {service.images.map((img, imgIndex) => (
        //                   //     <SwiperSlide key={imgIndex}>
        //                   //       <img
        //                   //         src={`${
        //                   //           import.meta.env.VITE_API_BASE_URL
        //                   //         }/images/${img}`}
        //                   //         className="d-block w-100"
        //                   //         alt={`${service.name}-${imgIndex}`}
        //                   //         style={{
        //                   //           borderRadius: "8px",
        //                   //           height: "200px",
        //                   //           objectFit: "cover",
        //                   //         }}
        //                   //       />
        //                   //     </SwiperSlide>
        //                   //   ))}
        //                   // </Swiper>
        //                   <Swiper
        //                     modules={[Autoplay]}
        //                     loop={true}
        //                     speed={700}
        //                     slidesPerView={1}
        //                     autoplay={{
        //                       delay: 1000,
        //                       disableOnInteraction: false,
        //                     }}
        //                     onSwiper={(swiper) => {
        //                       swiperRefs.current[index] = swiper;
        //                       swiper.autoplay.stop(); // start paused
        //                     }}
        //                   >
        //                     {service.images.map((img, imgIndex) => (
        //                       <SwiperSlide key={imgIndex}>
        //                         <div
        //                           style={{
        //                             position: "relative",
        //                             width: "100%",
        //                             aspectRatio: "4 / 3", // ✅ lock 4:3 ratio
        //                             borderRadius: "8px",
        //                             overflow: "hidden",
        //                           }}
        //                         >
        //                           <img
        //                             src={`${
        //                               import.meta.env.VITE_API_BASE_URL
        //                             }/images/${img}`}
        //                             alt={`${service.name}-${imgIndex}`}
        //                             style={{
        //                               width: "100%",
        //                               height: "100%",
        //                               objectFit: "cover",
        //                               display: "block",
        //                             }}
        //                           />
        //                         </div>
        //                       </SwiperSlide>
        //                     ))}
        //                   </Swiper>
        //                 ) : (
        //                   <img
        //                     src={`${import.meta.env.VITE_API_BASE_URL}/images/${
        //                       service.images[0]
        //                     }`}
        //                     className="d-block w-100"
        //                     alt={service.name}
        //                     style={{
        //                       borderRadius: "8px",
        //                       height: "200px",
        //                       objectFit: "cover",
        //                     }}
        //                   />
        //                 )}
        //                 {/* Wishlist Icon */}
        //                 <button
        //                   onClick={() => handleFavourite(service.store_id)}
        //                   className="wishlist-icon btn p-1"
        //                   style={{
        //                     position: "absolute",
        //                     top: "14px",
        //                     right: "14px",
        //                     zIndex: 10,
        //                     background: "#36343440",
        //                     borderRadius: "50%",
        //                   }}
        //                 >
        //                   <FaRegHeart size={20} />
        //                 </button>
        //               </div>
        //               {/* Content Section */}
        //               <div className="service-content mt-0 mt-md-2">
        //                 <div className="title-type">
        //                   <div className="title">
        //                     <h5>{service?.name}</h5>
        //                     {service?.averagerating >= 0 && (
        //                       <span
        //                         className="star-rating"
        //                         style={{ color: "#f5c518", fontSize: "18px" }}
        //                       >
        //                         {renderStars(service?.averagerating)}
        //                       </span>
        //                     )}
        //                   </div>
        //                   <div className="type">
        //                     {service?.store_type || "Unisex"}
        //                   </div>
        //                 </div>
        //                 <div
        //                   className="d-flex align-items-start mt-4"
        //                   style={{ maxWidth: "100%" }}
        //                 >
        //                   <MdLocationOn
        //                     size={20}
        //                     className="me-2 flex-shrink-0"
        //                   />
        //                   <span
        //                     className="text-truncate"
        //                     style={{ maxWidth: "calc(100% - 24px)" }}
        //                   >
        //                     {service?.addressLine1 || service?.addressLine2
        //                       ? [service?.addressLine1, service?.addressLine2]
        //                           .filter(Boolean)
        //                           .join(" ")
        //                       : "Address not available"}
        //                   </span>
        //                 </div>
        //                 <div style={{ textAlign: "center" }}>
        //                   <span
        //                     className="service-readmore text-decoration-none"
        //                     style={{ cursor: "pointer" }}
        //                     onClick={() => {
        //                       navigate(`/shopdetail/${service?.store_id}`);
        //                       window.location.reload();
        //                     }}
        //                   >
        //                     Book now
        //                   </span>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //         ))
        //       ) : (
        //         <div className="col-12 text-center mt-5">
        //           <div className="d-flex flex-column align-items-center">
        //             <MdStoreMallDirectory size={60} color="#888" />
        //             <h4 className="text-muted mt-3">No top salons found</h4>
        //             <p className="text-secondary">
        //               Please try adjusting your filters or search again later.
        //             </p>
        //           </div>
        //         </div>
        //       )}
        //     </div>
        //   </div>
        // </div>
      }
      <div className="container-fluid px-0 px-sm-4 px-md-5">
        {/* Section Header */}
        {topsalons?.length > 0 && (
          <div className="mb-4">
            <h2 className="fw-bold text-dark mt-5">Top Salons & Spa</h2>
          </div>
        )}

        {/* Salon Grid */}
        <div className="row g-4">
          {topsalons?.length > 0 ? (
            topsalons.map((service, index) => (
              <div
                className="col-12 col-md-6 col-lg-3 d-flex"
                style={{ cursor: "pointer", minHeight: "350px", marginBottom: "20px" }}
                key={index}
                onClick={() => {
                  navigate(`/shopdetail/${service?.store_id}`);
                  window.location.reload();
                }}
              >
                <div className="w-100 h-100" data-wow-delay={service.delay}>
                  <ServiceCard 
                    service={{
                      id: service.id,
                      name: service.name,
                      logo: null,
                      rating: service.averagerating ? Number(service.averagerating).toFixed(1) : null,
                      reviews: null,
                      location: service.area || service.city || service.district ? [service.area, service.city, service.district].filter(Boolean).join(", ") : null,
                      distance: null, /* Removed for now based on comment */
                      type: service.store_type && service.store_type.toLowerCase() !== "unisex" ? service.store_type : "Unisex",
                      services: [], // TopSalons doesn't provide this directly in the array easily
                      isPremium: false,
                      images: service.images?.length > 0 
                        ? service.images.map(img => `${import.meta.env.VITE_API_BASE_URL}/images/${img}`)
                        : []
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center mt-5">
              <div className="d-flex flex-column align-items-center">
                <MdStoreMallDirectory size={60} color="#888" />
                <h4 className="text-muted mt-3">No top salons found</h4>
                <p className="text-secondary">
                  Please try adjusting your filters or search again later.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopSalons;
