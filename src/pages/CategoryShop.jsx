import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { shopbyCategory } from "../redux/slice/categorySlice";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { toast } from "react-hot-toast";
import { addFavourites } from "../redux/slice/favouritesSlice";
import {
  MdStar,
  MdStarOutline,
  MdOutlineStarHalf,
  MdLocationOn,
  MdStoreMallDirectory,
} from "react-icons/md";
import { Mars, Venus, VenusAndMars } from "lucide-react";
import { FaRegHeart } from "react-icons/fa6";

const CategoryShop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(shopbyCategory({ category_id: id }));
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  let categoryShopList = useSelector((state) => state.category.categorySalon);

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
  const handleFavourite = async (e, id) => {
    e.stopPropagation();
    try {
      const result = await dispatch(addFavourites({ store_id: id })).unwrap();

      // Dismiss any previous toast with same ID
      toast.dismiss("already-fav");
      toast.dismiss("added-fav");
      toast.dismiss("generic-fav");

      if (result === "Store already in Favourites") {
        toast("Store is already in your favourites.", {
          id: "already-fav",
          icon: "⚠️",
        });
        dispatch(shopbyCategory({ category_id: id }));
      } else if (result === "favourites added sucssesfully") {
        toast.success("Store added to favourites successfully!", {
          id: "added-fav",
        });
        dispatch(shopbyCategory({ category_id: id }));
      } else {
        toast.success(result, {
          id: "generic-fav",
        });
        dispatch(shopbyCategory({ category_id: id }));
      }
    } catch (error) {
      toast.dismiss("error-fav");

      toast.error(error?.message || "Failed to add favourite", {
        id: "error-fav",
      });
    }
  };
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const totalStars = 5;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <MdStar key={`full-${i}`} style={{ fontSize: "20px" }} />
        ))}
        {hasHalfStar && (
          <MdOutlineStarHalf key="half" style={{ fontSize: "20px" }} />
        )}
        {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map(
          (_, i) => (
            <MdStarOutline key={`empty-${i}`} style={{ fontSize: "20px" }} />
          )
        )}
      </>
    );
  };
  const swiperRefs = useRef([]);
  return (
    <div>
      <div className="container-fluid mb-5 px-0 px-sm-4 px-md-5 px-lg-0 px-xl-0">
        <div class="container-fluid px-0 px-sm-4 px-md-5 px-lg-5 px-xl-5">
          <div className="row d-flex flex-wrap" style={{ rowGap: "1.5rem" }}>
            {/* {allShopsList?.length > 0 && ( */}
            <div className="mb-4">
              <h2 className="fw-bold text-dark mt-5">Salon List by Category</h2>
            </div>
            {/* )} */}
            {
              // {categoryShopList?.length > 0 ? (
              //   categoryShopList.map((service, index) => {
              //     return (
              //       <div className="col-12 col-md-6 col-lg-3 d-flex" key={index}>
              //         <div
              //           className="service-item-layout2 wow fadeInUp d-flex flex-column h-100 w-100"
              //           data-wow-delay={service.delay}
              //         >
              //           {/* Image Section */}
              //           <div
              //             className="service-image position-relative"
              //             onMouseEnter={() =>
              //               swiperRefs.current[index]?.autoplay?.start()
              //             }
              //             onMouseLeave={() =>
              //               swiperRefs.current[index]?.autoplay?.stop()
              //             }
              //             onTouchStart={() =>
              //               swiperRefs.current[index]?.autoplay?.start()
              //             }
              //             onTouchEnd={() =>
              //               swiperRefs.current[index]?.autoplay?.stop()
              //             }
              //           >
              //             {service.images.length > 1 ? (
              //               <Swiper
              //                 modules={[Autoplay]}
              //                 loop={true}
              //                 speed={700}
              //                 slidesPerView={1}
              //                 autoplay={{
              //                   delay: 1000,
              //                   disableOnInteraction: false,
              //                 }}
              //                 onSwiper={(swiper) => {
              //                   swiperRefs.current[index] = swiper;
              //                   swiper.autoplay.stop(); // start paused
              //                 }}
              //               >
              //                 {service.images.map((img, imgIndex) => (
              //                   <SwiperSlide key={imgIndex}>
              //                     <img
              //                       src={`${
              //                         import.meta.env.VITE_API_BASE_URL
              //                       }/images/${img}`}
              //                       className="d-block w-100"
              //                       alt={`${service.name}-${imgIndex}`}
              //                       style={{
              //                         borderRadius: "8px",
              //                         height: "200px",
              //                         objectFit: "cover",
              //                       }}
              //                     />
              //                   </SwiperSlide>
              //                 ))}
              //               </Swiper>
              //             ) : (
              //               <img
              //                 src={`${import.meta.env.VITE_API_BASE_URL}/images/${
              //                   service.images[0]
              //                 }`}
              //                 className="d-block w-100"
              //                 alt={service.name}
              //                 style={{
              //                   borderRadius: "8px",
              //                   height: "200px",
              //                   objectFit: "cover",
              //                 }}
              //               />
              //             )}
              //             {/* Wishlist Icon */}
              //             <button
              //               className="wishlist-icon btn p-1"
              //               onClick={() => handleFavourite(service.store_id)}
              //               style={{
              //                 position: "absolute",
              //                 top: "14px",
              //                 right: "14px",
              //                 zIndex: 10,
              //                 background: "#36343440",
              //                 borderRadius: "50%",
              //               }}
              //             >
              //               <FaRegHeart size={20} />
              //             </button>
              //           </div>
              //           {/* Content Section */}
              //           <div className="service-content mt-0 mt-md-2">
              //             <div className="title-type">
              //               <div className="title">
              //                 <h5>{service?.name}</h5>
              //               </div>
              //               <div className="type">
              //                 <span>{service?.store_type || "Unisex"}</span>
              //               </div>
              //             </div>
              //             {service?.averagerating >= 0 && (
              //               <span
              //                 className="star-rating"
              //                 style={{ color: "#f5c518", fontSize: "18px" }}
              //               >
              //                 {renderStars(service?.averagerating)}
              //               </span>
              //             )}
              //             <div
              //               className="d-flex align-items-start mt-4"
              //               style={{ maxWidth: "100%" }}
              //             >
              //               <MdLocationOn
              //                 size={20}
              //                 className="me-2 flex-shrink-0"
              //               />
              //               <span
              //                 className="text-truncate"
              //                 style={{ maxWidth: "calc(100% - 24px)" }}
              //               >
              //                 {service?.addressLine1 || service?.addressLine2
              //                   ? [service?.addressLine1, service?.addressLine2]
              //                       .filter(Boolean)
              //                       .join(" ")
              //                   : "Address not available"}
              //               </span>
              //             </div>
              //             <div style={{ textAlign: "center" }}>
              //               <span
              //                 className="service-readmore text-decoration-none"
              //                 style={{ cursor: "pointer" }}
              //                 onClick={() => {
              //                   navigate(`/shopdetail/${service?.store_id}`);
              //                   window.location.reload();
              //                 }}
              //               >
              //                 Book now
              //               </span>
              //             </div>
              //           </div>
              //         </div>
              //       </div>
              //     );
              //   })
              // ) : (
              //   <div className="col-12 text-center mt-5">
              //     <div className="d-flex flex-column align-items-center">
              //       <MdStoreMallDirectory size={60} color="#888" />
              //       <h4 className="text-muted mt-3">No new salons found</h4>
              //       <p className="text-secondary">
              //         Please check back later or try a different location.
              //       </p>
              //     </div>
              //   </div>
              // )}
            }
            {categoryShopList?.length > 0 ? (
              categoryShopList.map((service, index) => (
                <div
                  className="col-6 col-md-6 col-lg-3 d-flex"
                  style={{ cursor: "pointer" }}
                  key={index}
                  onClick={() => {
                    navigate(`/shopdetail/${service?.store_id}`);
                    window.location.reload();
                  }}
                >
                  <div
                    className="service-item-layout2 wow fadeInUp d-flex flex-column h-100 w-100 shadow-sm rounded-3 overflow-hidden bg-white"
                    data-wow-delay={service.delay}
                    style={{ transition: "all 0.3s ease" }}
                  >
                    {/* Image Section */}
                    <div
                      className="service-image position-relative"
                      onMouseEnter={() =>
                        swiperRefs.current[index]?.autoplay?.start()
                      }
                      onMouseLeave={() =>
                        swiperRefs.current[index]?.autoplay?.stop()
                      }
                      onTouchStart={() =>
                        swiperRefs.current[index]?.autoplay?.start()
                      }
                      onTouchEnd={() =>
                        swiperRefs.current[index]?.autoplay?.stop()
                      }
                    >
                      {service.images.length > 1 ? (
                        <Swiper
                          modules={[Autoplay]}
                          loop
                          speed={700}
                          slidesPerView={1}
                          autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                          }}
                          onSwiper={(swiper) => {
                            swiperRefs.current[index] = swiper;
                            swiper.autoplay.stop(); // start paused
                          }}
                        >
                          {service.images.map((img, imgIndex) => (
                            <SwiperSlide key={imgIndex}>
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  aspectRatio: "18 / 9",
                                  overflow: "hidden",
                                }}
                              >
                                <img
                                  src={`${
                                    import.meta.env.VITE_API_BASE_URL
                                  }/images/${img}`}
                                  alt={`${service.name}-${imgIndex}`}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                  }}
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ) : (
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "18 / 9",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/images/${
                              service.images[0]
                            }`}
                            alt={service.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                      )}

                      {/* Wishlist Icon */}
                      <button
                        onClick={(e) => handleFavourite(e, service.store_id)}
                        className="wishlist-icon btn p-2 d-flex align-items-center justify-content-center"
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          zIndex: 10,
                          background: "rgba(54, 52, 52, 0.4)",
                          borderRadius: "50%",
                          color: "#fff",
                        }}
                      >
                        <FaRegHeart
                          size={18}
                          color={service.is_favourite ? "red" : "white"}
                        />
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="service-content p-2 p-md-3 d-flex flex-column justify-content-between flex-grow-1">
                      <div>
                        <div className="title-type d-flex justify-content-between align-items-center mb-2">
                          <h5 className="mb-0 fs-6 fs-md-3">{service?.name}</h5>
                          {service?.averagerating >= 0 && (
                            <span
                              className="star-rating d-flex align-items-center fs-9 fs-md-4"
                              style={{ color: "#f5c518" }}
                            >
                              <MdStar
                                className="fs-6 fs-md-4"
                                style={{ marginRight: "4px" }}
                              />
                              {Number(service?.averagerating).toFixed(1)}
                            </span>
                          )}
                        </div>
                        <div className="text-muted small d-flex align-items-center gap-1">
                          {service?.store_type?.toLowerCase() ===
                            "male only" && (
                            <>
                              <Mars size={14} strokeWidth={2} /> Male Only
                            </>
                          )}

                          {service?.store_type?.toLowerCase() ===
                            "female only" && (
                            <>
                              <Venus size={14} strokeWidth={2} /> Female Only
                            </>
                          )}

                          {(!service?.store_type ||
                            service?.store_type?.toLowerCase() ===
                              "unisex") && (
                            <>
                              <VenusAndMars size={14} strokeWidth={2} /> Unisex
                            </>
                          )}
                        </div>
                      </div>

                      <div className="d-flex align-items-start mt-3">
                        <MdLocationOn
                          size={18}
                          className="me-2 text-danger flex-shrink-0"
                        />
                        <span
                          className="text-truncate small"
                          style={{ maxWidth: "calc(100% - 24px)" }}
                        >
                          {service?.addressLine1 || service?.addressLine2
                            ? [service?.addressLine1, service?.addressLine2]
                                .filter(Boolean)
                                .join(" ")
                            : "Address not available"}
                        </span>
                      </div>

                      <div className="mt-3 text-center">
                        <span
                          className="service-readmore text-decoration-none"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/shopdetail/${service?.store_id}`);
                            window.location.reload();
                          }}
                        >
                          Book Now
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center mt-5">
                <div className="d-flex flex-column align-items-center">
                  <MdStoreMallDirectory size={60} color="#888" />
                  <h4 className="text-muted mt-3">No top salons found</h4>
                  <p className="text-secondary">
                    No stores found in this category.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryShop;
