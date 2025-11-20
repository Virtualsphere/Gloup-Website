import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Mars, Venus, VenusAndMars } from "lucide-react";
import { BiSearchAlt } from "react-icons/bi";
import {
  MdOutlineStarHalf,
  MdStarOutline,
  MdStar,
  MdLocationOn,
  MdArrowForwardIos,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import moment from "moment";

import { CalendarIcon } from "lucide-react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  startOfDay,
  isBefore,
} from "date-fns";
import { FaRegHeart } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setSelectedItem } from "../redux/slice/setBookNowSlice";
import { fetchShopDetail } from "../redux/slice/shopDetailSlice";
import { fetchAvailableSlots } from "../redux/slice/slotSlice";
import { Icon } from "@iconify/react";
import { addFavourites } from "../redux/slice/favouritesSlice";

const ShopDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabsData, setTabsData] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [isMonthViewOpen, setIsMonthViewOpen] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [comboServices, setComboServices] = useState("");
  // Generate current week's days
  const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const currentWeek = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfCurrentWeek, i)
  );
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    dispatch(fetchShopDetail({ id: Number(id) }));
  }, [dispatch]);
  let shopDetail = useSelector((state) => state.shopDetail.shopDetail);
  const {
    availabeSlots,
    loading: slotsLoading,
    error: slotsError,
  } = useSelector((state) => state.availabeSlots);

  function formatTo12Hour(time24) {
    const [hourStr, minuteStr] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
  }
  const formattedSlots = availabeSlots.map((slot) => ({
    ...slot,
    from: formatTo12Hour(slot.from),
    to: formatTo12Hour(slot.to),
  }));

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
  useEffect(() => {
    const today = startOfDay(new Date());
    dispatch(
      fetchAvailableSlots({
        date: format(today, "yyyy-MM-dd"),
        store_id: Number(id),
      })
    );

    setSelectedDate(today); // if you want to also set it as default selected
  }, [dispatch, id]);
  const handleDayClick = (day) => {
    if (!isBefore(day, startOfDay(today))) {
      setSelectedDate(day);
      dispatch(
        fetchAvailableSlots({
          date: format(day, "yyyy-MM-dd"),
          store_id: Number(id),
        })
      );
      setIsMonthViewOpen(false);
    }
  };

  const generateTabJsonData = (service_category, services, combo) => {
    const allServicesGrouped = service_category?.map((category) => {
      let relatedServices = services.filter(
        (service) => service.service_category === category.id
      );

      if (category.id === 2 && Array.isArray(combo)) {
        const comboServices = combo.map((comboItem) => ({
          id: comboItem?.id,
          service_category: 2,
          title: comboItem?.combo,
          duration: comboItem?.duration || "30 min",
          discount_price: comboItem?.amount,
          // actual_price: comboItem?.actual_price || "",
          status: comboItem?.status || "active",
          isCombo: true,
        }));

        relatedServices = [...relatedServices, ...comboServices];
      }

      return {
        title: category.name,
        services: relatedServices.map((service) => ({
          id: service?.id,
          service_category: service?.service_category,
          title: service?.title || service?.service_name,
          duration: service?.duration || "30 min",
          discount_price: service?.discount_price || service?.discounted_amount,
          actual_price: service?.actual_price || service?.amount,
          status: service?.status,
          isCombo: service?.isCombo || false,
        })),
      };
    });

    const allTab = {
      key: "all",
      title: "All",
      categories: allServicesGrouped,
    };

    const categoryTabs =
      Array.isArray(service_category) && Array.isArray(services)
        ? service_category.map((category) => {
            let relatedServices = services.filter(
              (service) => service.service_category === category.id
            );

            if (category.id === 2 && Array.isArray(combo)) {
              const comboServices = combo.map((comboItem) => ({
                id: comboItem?.id,
                service_category: 2,
                title: comboItem?.combo,
                duration: comboItem?.duration || "30 min",
                discount_price: `${comboItem?.amount}`,
                // actual_price: comboItem?.actual_price || "",
                status: comboItem?.status || "active",
                isCombo: true,
              }));

              relatedServices = [...relatedServices, ...comboServices];
            }

            return {
              key: category.name.toLowerCase().replace(/\s+/g, "-"),
              title: category.name,
              categories: [
                {
                  title: category.name,
                  services: relatedServices.map((service) => ({
                    id: service?.id,
                    service_category: service?.service_category,
                    title: service?.title || service?.service_name,
                    duration: service?.duration || "30 min",
                    discount_price:
                      typeof service?.discount_price === "string"
                        ? service.discount_price
                        : `${
                            service.discount_price || service.discounted_amount
                          }`,
                    actual_price: service?.actual_price || service?.amount,
                    status: service?.status,
                    isCombo: service?.isCombo || false,
                  })),
                },
              ],
            };
          })
        : [];

    return [allTab, ...categoryTabs];
  };

  useEffect(() => {
    const combinedData = generateTabJsonData(
      shopDetail?.service_category,
      shopDetail?.services,
      shopDetail?.combos
    );
    setTabsData(combinedData);

    if (combinedData.length > 0) {
      setActiveTab(combinedData[0].key); // sets "all" tab as default
    }
  }, [shopDetail]);

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

  const toggleService = (service) => {
    const exists = selectedServices.some((s) => s.id === service.id);

    if (exists) {
      setSelectedServices((prev) => prev.filter((s) => s.id !== service.id));

      // If it's a combo service, also remove it from comboServices
      if (service.service_category === 2) {
        setComboServices((prev) => prev.filter((s) => s.id !== service.id));
      }
    } else {
      setSelectedServices((prev) => [...prev, service]);

      // If it's a combo service, also add it to comboServices
      if (service.service_category === 2) {
        setComboServices((prev) => [...prev, service]);
      }
    }
  };

  const renderTabContent = () => {
    const tab = tabsData.find((t) => t.key === activeTab);

    if (!tab || !Array.isArray(tab.categories)) return null;

    return tab.categories.map(
      (category, categoryIndex) =>
        category.services?.length > 0 && (
          <div
            className="category-block mb-4"
            key={category.title || categoryIndex}
          >
            <h6>{category.title}</h6>
            <div className="row">
              {category.services.map((service, serviceIndex) => {
                const isSelected = selectedServices.some(
                  (s) => s.id === service.id
                );

                return (
                  <div
                    className="col-6 col-md-6 col-xl-4 mb-4"
                    key={service.id || serviceIndex}
                  >
                    <div
                      className="card shadow-sm position-relative"
                      onClick={() => toggleService(service)}
                      style={{
                        border: isSelected
                          ? "2px solid #000"
                          : "1px solid #ddd",
                        borderRadius: "12px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        backgroundColor: "#fff",
                        height: "100%",
                      }}
                    >
                      {isSelected ? (
                        <div
                          style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-5px",
                            background: "#000",
                            color: "#fff",
                            borderRadius: "50%",
                            width: "22px",
                            height: "22px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                          }}
                        >
                          <IoMdCheckmark />
                        </div>
                      ) : (
                        <>
                          <div
                            style={{
                              position: "absolute",
                              top: "-5px",
                              right: "-5px",
                              background: "#ecebeb",
                              color: "#fff",
                              borderRadius: "50%",
                              width: "22px",
                              height: "22px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "14px",
                            }}
                          >
                            <IoMdCheckmark />
                          </div>
                        </>
                      )}

                      <div className="card-body">
                        <div
                          className="d-flex justify-content-between align-items-start"
                          style={{ calumnGap: "10px" }}
                        >
                          <div>
                            <p
                              className="card-title"
                              style={{
                                color: "#000",
                                fontWeight: "500",
                                marginBottom: "0.5rem",
                                textTransform: "capitalize",
                                wordBreak: "break-word",
                              }}
                            >
                              {service.title}
                            </p>
                            <p
                              className="card-subtitle mb-2 text-muted"
                              style={{
                                fontSize: "0.9rem",
                              }}
                            >
                              {(() => {
                                const duration = moment.duration(
                                  service.duration
                                );
                                const hours = duration.hours();
                                const minutes = duration.minutes();

                                if (hours > 0 && minutes > 0)
                                  return `${hours}h ${minutes}m`;
                                if (hours > 0) return `${hours}h`;
                                return `${minutes}m`;
                              })()}
                            </p>
                          </div>
                          <div className="text-end">
                            <p style={{ fontWeight: "500", margin: 0 }}>
                              {service?.discount_price > 0 ? (
                                <>
                                  ₹
                                  {Number(
                                    service.discount_price
                                  ).toLocaleString("en-IN")}
                                  <br />
                                  <span
                                    style={{ fontSize: "14px", color: "#888" }}
                                  >
                                    {service.actual_price > 0 && (
                                      <del>
                                        ₹
                                        {Number(
                                          service.actual_price
                                        ).toLocaleString("en-IN")}
                                      </del>
                                    )}
                                  </span>
                                </>
                              ) : (
                                <>
                                  {service.actual_price > 0 && (
                                    <span>
                                      ₹
                                      {Number(
                                        service.actual_price
                                      ).toLocaleString("en-IN")}
                                    </span>
                                  )}
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
    );
  };

  const maxSlidesToShow = 3;
  const actualSlides = shopDetail?.stylist?.length || 0;
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   responsive: [
  //     {
  //       breakpoint: 992,
  //       settings: { slidesToShow: 2 },
  //     },
  //     {
  //       breakpoint: 576,
  //       settings: { slidesToShow: 1 },
  //     },
  //   ],
  // };

  const settings = {
    dots: false,
    infinite: actualSlides > maxSlidesToShow, // Infinite scroll only if enough slides
    slidesToShow: Math.min(actualSlides, maxSlidesToShow),
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: Math.min(actualSlides, 2),
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const renderMonthCalendar = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });

    const weeks = [];
    let days = [];
    let day = startDate;

    while (day <= monthEnd) {
      for (let i = 0; i < 7; i++) {
        days.push(day);
        day = addDays(day, 1);
      }
      if (days.some((d) => isSameMonth(d, selectedDate))) {
        weeks.push(days);
      }
      days = [];
    }

    return weeks;
  };
  const monthCalendar = renderMonthCalendar();

  const mapLink = `https://www.google.com/maps?q=${shopDetail?.address?.location?.coordinates[1]},${shopDetail?.address?.location?.coordinates[0]}`;

  const toggleReadMore = (idx) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const maxChars = 50;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const hours = "9:30 AM - 10:00 PM";
  const matchToday = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const handleBookNow = () => {
    if (selectedServices?.length == 0 || !selectedDate || !selectedSlotId) {
      const toastId = "book";
      toast.dismiss(toastId);
      toast.error("select your services and slot with time", { id: toastId });
      return;
    }

    const combos = Array.isArray(comboServices)
      ? comboServices.map((service) => ({
          name: service.title,
          duration: service.duration,
          amount: service.discount_price,
          id: Number(service?.id),
        }))
      : [];

    const comboCategorySet = new Set(
      Array.isArray(comboServices)
        ? comboServices.map((combo) => combo.service_category)
        : []
    );

    const Services = selectedServices
      ?.filter((item) => !comboCategorySet.has(item.service_category))
      .map((item) => ({
        id: item.id,
        name: item.title,
        amount: item?.discount_price || item?.actual_price,
        actual_amount: item?.actual_price || item?.actual_price,
        duration: item.duration,
      }));

    const data = {
      store_id: Number(id),
      service: Services,
      booking_date: moment(selectedDate).format("YYYY-MM-DD"),
      slot_id: selectedSlotId,
      combos, // empty if none selected
      shopDetail,
    };
    dispatch(setSelectedItem(data));

    navigate("/checkout");
  };
  const handleFavourite = async () => {
    try {
      const result = await dispatch(
        addFavourites({ store_id: Number(id) })
      ).unwrap();

      toast.dismiss("already-fav");
      toast.dismiss("added-fav");
      toast.dismiss("generic-fav");

      if (result === "Store already in Favourites") {
        toast("Store is already in your favourites.", {
          id: "already-fav",
          icon: "⚠️",
        });
        dispatch(fetchShopDetail({ id: Number(id) }));
      } else if (result === "favourites added sucssesfully") {
        toast.success("Store added to favourites successfully!", {
          id: "added-fav",
        });
        dispatch(fetchShopDetail({ id: Number(id) }));
      } else {
        toast.success(result, {
          id: "generic-fav",
        });
        dispatch(fetchShopDetail({ id: Number(id) }));
      }
    } catch (error) {
      toast.dismiss("error-fav");

      toast.error(error?.message || "Failed to add favourite", {
        id: "error-fav",
      });
    }
  };
  const handleRelatedStoreFavourite = async (e, id) => {
    e.stopPropagation();
    try {
      const result = await dispatch(
        addFavourites({ store_id: Number(id) })
      ).unwrap();

      toast.dismiss("already-fav");
      toast.dismiss("added-fav");
      toast.dismiss("generic-fav");

      if (result === "Store already in Favourites") {
        toast("Store is already in your favourites.", {
          id: "already-fav",
          icon: "⚠️",
        });
        dispatch(fetchShopDetail({ id: Number(id) }));
      } else if (result === "favourites added sucssesfully") {
        toast.success("Store added to favourites successfully!", {
          id: "added-fav",
        });
        dispatch(fetchShopDetail({ id: Number(id) }));
      } else {
        toast.success(result, {
          id: "generic-fav",
        });
        dispatch(fetchShopDetail({ id: Number(id) }));
      }
    } catch (error) {
      toast.dismiss("error-fav");

      toast.error(error?.message || "Failed to add favourite", {
        id: "error-fav",
      });
    }
  };
  const swiperRefs = useRef([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      {/* Page Service Single Start  */}
      <div className="page-service-single">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 d-none d-lg-block">
              {/* Service Sidebar Start  */}
              <div className="service-sidebar">
                {/* Service List Box Start */}

                <div className="service-list-box wow fadeInUp">
                  <h3 className="mb-3 fw-semibold text-dark">Amenities</h3>

                  <div className="service-list-entry">
                    {Array.isArray(shopDetail?.aminities) &&
                    shopDetail.aminities.length > 0 ? (
                      <ul className="list-unstyled mb-0">
                        {shopDetail.aminities.map((item) => (
                          <li
                            key={item.aminity_id}
                            className="d-flex align-items-center gap-3 py-2 border-bottom"
                          >
                            <span
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                backgroundColor: "#f1f1f1",
                              }}
                            >
                              <Icon icon={item.icon} width="20" height="20" />
                            </span>

                            <span className="fw-medium text-dark">
                              {item.aminity_name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">No amenities available.</p>
                    )}
                  </div>
                </div>
                <div className="container p-0">
                  {/* <h4 className="mb-4">Business Hours</h4> */}
                  <h5 className="fw-semibold mb-3">Business Hours</h5>
                  <div className="row">
                    {days.map((day, idx) => (
                      <div
                        key={idx}
                        className="d-flex justify-content-between align-items-center py-2 border-0 col-12"
                      >
                        <div className="d-flex align-items-center gap-2">
                          {/* Dot and Day */}
                          <span
                            style={{
                              width: "12px",
                              height: "12px",
                              backgroundColor:
                                day === matchToday ? "#000" : "#777",
                              borderRadius: "400px 400px 50px 400px",
                              flexShrink: 0,
                            }}
                          ></span>
                          <span
                            className={`mb-0 ${
                              day === matchToday ? "fw-bold" : ""
                            }`}
                          >
                            {day}
                          </span>
                        </div>

                        {/* Time */}
                        <span
                          className={`mb-0 ${
                            day === matchToday ? "fw-bold" : ""
                          }`}
                        >
                          {hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* // map */}
                <div className="mb-4 mt-4">
                  <div class="d-flex flex-column justify-content-between mb-4">
                    {" "}
                    <h5 className="fw-semibold">Location</h5>
                    <div className="d-flex align-items-center justify-content-between gap-1">
                      <div className="d-flex align-items-center gap-1 mr-3">
                        {/* <MdLocationOn size={20} className="text-dark" /> */}
                        {/* <p
                          className="mb-0 text-dark fw-medium text-capitalize"
                          style={{
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          {(shopDetail?.address?.addressLine1 || "") +
                            " " +
                            (shopDetail?.address?.addressLine2 || "")}
                        </p> */}
                        <p
                          className="mb-0 text-dark fw-medium text-capitalize"
                          style={{
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          {[
                            shopDetail?.address?.addressLine1,
                            shopDetail?.address?.addressLine2,
                            shopDetail?.address?.area,
                            shopDetail?.address?.city,
                            shopDetail?.address?.district,
                          ]
                            .filter(Boolean)
                            .join(", ") || "Address not available"}
                        </p>
                      </div>

                      {/* Forward arrow icon */}
                      <IoArrowForward
                        size={20}
                        color=""
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>

                  {/* Embedded Google Map */}
                  <div className="ratio ratio-1x1 rounded overflow-hidden mb-3">
                    <iframe
                      src={`https://maps.google.com/maps?q=${shopDetail?.address?.location?.coordinates[1]},${shopDetail?.address?.location?.coordinates[0]}&z=15&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Google Map Location"
                    ></iframe>
                  </div>

                  {/* Address + Button */}
                  <div className="row align-items-center">
                    {/* Address Left */}
                    {/* <div className="col-12 col-md-8 mb-2 mb-md-0 d-flex align-items-start gap-2">
                      <MdLocationOn size={20} className="text-dark mt-1 " />
                      <p
                        className="mb-0 text-dark fw-medium text-capitalize"
                        style={{ wordWrap: "break-word", whiteSpace: "normal" }}
                      >
                        {(shopDetail?.address?.addressLine1 || "") +
                          " " +
                          (shopDetail?.address?.addressLine2 || "")}
                      </p>
                    </div> */}

                    {/* Button Right */}
                    {/* <div className="col-12 col-md-4 text-md-end">
                      <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark px-4 py-3 rounded-pill"
                      >
                        View Maps
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* Service Sidebar End  */}
            </div>

            <div className="col-lg-8">
              {/* Service Content Start  */}
              <div className="service-content">
                {/* <div className="service-image">
                  <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop
                    className="hover-anime"
                    style={{ borderRadius: "25px 25px 10px 25px" }}
                  >
                    {shopDetail?.basicinfo[0]?.images?.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={`${
                            import.meta.env.VITE_API_BASE_URL
                          }/images/${img}`}
                          alt={`Slide ${index + 1}`}
                          style={{
                            borderRadius: "25px 25px 10px 25px",
                            width: "100%",
                            display: "block",
                            objectFit: "contain",
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div> */}
                <div className="service-image">
                  <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop
                    className="hover-anime"
                  >
                    {shopDetail?.basicinfo[0]?.images?.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={`${
                            import.meta.env.VITE_API_BASE_URL
                          }/images/${img}`}
                          alt={`Slide ${index + 1}`}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className="service-entry">
                  <div className="position-relative">
                    <div className="d-flex flex-row flex-md-row justify-content-between align-items-start align-items-md-center">
                      {/* Left: Shop Info */}
                      <div>
                        <h2 className="mb-1" style={{ fontWeight: 600 }}>
                          {shopDetail?.basicinfo?.[0]?.name || "Shop Name"}
                        </h2>
                        {/* <span
                          style={{
                            border: "1px solid #e5e5e5",
                            padding: "4px 12px",
                            textTransform: "capitalize",
                            borderRadius: "20px",
                            color: "#737373",
                            marginTop: "5px",
                            fontSize: "14px",
                          }}
                        >
                          {shopDetail?.basicinfo?.[0]?.store_type || "Unisex"}
                        </span> */}
                        <div className="text-muted small d-flex align-items-center gap-1">
                          {shopDetail?.basicinfo?.[0]?.store_type?.toLowerCase() ===
                            "male only" && (
                            <>
                              <Mars size={14} strokeWidth={2} /> Male Only
                            </>
                          )}

                          {shopDetail?.basicinfo?.[0]?.store_type?.toLowerCase() ===
                            "female only" && (
                            <>
                              <Venus size={14} strokeWidth={2} /> Female Only
                            </>
                          )}

                          {(!shopDetail?.basicinfo?.[0]?.store_type ||
                            shopDetail?.basicinfo?.[0]?.store_type?.toLowerCase() ===
                              "unisex") && (
                            <>
                              <VenusAndMars size={14} strokeWidth={2} /> Unisex
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right: Wishlist Icon */}
                      <button
                        className="wishlist-icon btn p-2"
                        onClick={() => handleFavourite()}
                        style={{
                          background: "#ecebeb",
                          // border: "1px solid #dee2e6",
                          // borderRadius: "20px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        }}
                        title="Add to Favourites"
                      >
                        <FaRegHeart
                          size={22}
                          color={
                            shopDetail?.basicinfo?.[0].is_favourite
                              ? "red"
                              : "white"
                          }
                        />
                      </button>
                    </div>
                  </div>

                  {/* {shopDetail?.average >= 0 && (
                    <div
                      className="rating-section"
                      style={{ marginTop: "8px" }}
                    >
                      <div
                        className="star-rating"
                        style={{
                          color: "#f5c518",
                          fontSize: "18px",
                        }}
                      >
                        {shopDetail && renderStars(shopDetail?.average)}
                      </div>
                      {shopDetail?.average > 0 && (
                        <span>{Math.ceil(shopDetail.average)}</span>
                      )}
                    </div>
                  )} */}
                  {shopDetail?.average >= 0 && (
                    <div
                      className="rating-section d-flex align-items-center"
                      style={{ marginTop: "8px", color: "#f5c518" }}
                    >
                      <MdStar
                        style={{ fontSize: "18px", marginRight: "4px" }}
                      />
                      <span
                        style={{
                          fontSize: "16px",
                          color: "#f5c518",
                          background: "none",
                        }}
                      >
                        {Number(shopDetail?.average).toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* Service Content End  */}

              {/* Category Services Section Start */}
              <div className="category-service-section mt-4">
                <h4 className="mb-4">Explore Our Service Categories</h4>

                {/* <ul className="nav mb-3 border-0">
                  {tabsData.map((tab) => (
                    <li className="nav-item" key={tab.key}>
                      <button
                        className={`nav-link border-0 ${
                          activeTab === tab.key
                            ? "bg-dark text-white"
                            : "text-dark"
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                      >
                        {tab.title}
                      </button>
                    </li>
                  ))}
                </ul> */}
                <ul className="nav mb-3 border-0">
                  {tabsData.map((tab) => (
                    <li className="nav-item" key={tab.key}>
                      <button
                        className={`nav-link ${
                          activeTab === tab.key
                            ? "bg-dark text-white border border-dark"
                            : "text-dark border border-dark"
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                      >
                        {tab.title}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Tab Content */}
                {renderTabContent()}
              </div>
              {/* Category Services Section End */}

              <div className="container mb-5">
                <h4 className="mb-4 mt-5">Plan your day & time</h4>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="h5 mb-0">
                    {format(selectedDate, "MMMM yyyy")}
                  </h5>

                  <div className="position-relative">
                    <button
                      className="btn btn-outline-dark p-2"
                      onClick={() => setIsMonthViewOpen(!isMonthViewOpen)}
                    >
                      <CalendarIcon className="me-1" size={18} />
                      <span className="visually-hidden">Open calendar</span>
                    </button>

                    {isMonthViewOpen && (
                      <div
                        className="position-absolute end-0 mt-2 p-3 bg-white shadow rounded zindex-dropdown"
                        style={{ width: "18rem", border: "1px solid #dddddd" }}
                      >
                        <div
                          className="d-grid gap-1 text-center small mb-2"
                          style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
                        >
                          {[
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ].map((day) => (
                            <div key={day} className="fw-semibold">
                              {day}
                            </div>
                          ))}
                        </div>

                        {monthCalendar.map((week, weekIndex) => (
                          <div
                            key={weekIndex}
                            className="d-grid gap-1 mb-1"
                            style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
                          >
                            {week.map((day, dayIndex) => {
                              const isSelected = isSameDay(day, selectedDate);
                              const isCurrentMonth = isSameMonth(
                                day,
                                selectedDate
                              );
                              const isPastDay = isBefore(
                                day,
                                startOfDay(today)
                              );

                              if (!isCurrentMonth)
                                return <div key={dayIndex}></div>;

                              return (
                                <div
                                  key={dayIndex}
                                  className="d-flex justify-content-center"
                                >
                                  <button
                                    className={`d-flex align-items-center justify-content-center rounded-circle ${
                                      isSelected
                                        ? "bg-dark text-white"
                                        : "bg-white text-dark"
                                    }`}
                                    style={{
                                      width: "34px",
                                      height: "34px",
                                      fontSize: "0.85rem",
                                      transition: "all 0.2s ease",
                                      border: "1px solid #dddddd",
                                      opacity: isPastDay ? 0.4 : 1,
                                      cursor: isPastDay
                                        ? "not-allowed"
                                        : "pointer",
                                    }}
                                    disabled={isPastDay}
                                    onClick={() => {
                                      if (!isPastDay) {
                                        setSelectedDate(day);
                                        setIsMonthViewOpen(false);
                                      }
                                    }}
                                  >
                                    {format(day, "d")}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Inline Week View */}
                <div
                  className="d-grid gap-2 mb-4"
                  style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
                >
                  {currentWeek.map((day, index) => {
                    const isToday = isSameDay(day, today);
                    const isSelected = isSameDay(day, selectedDate);
                    const isPast = isBefore(day, startOfDay(today));

                    return (
                      <div
                        key={index}
                        className={`text-center py-2 rounded ${
                          isSelected
                            ? "bg-dark text-white"
                            : isToday
                            ? "bg-light"
                            : ""
                        }`}
                        style={{
                          cursor: isPast ? "not-allowed" : "pointer",
                          opacity: isPast ? 0.4 : 1,
                        }}
                        onClick={() => !isPast && handleDayClick(day)}
                      >
                        <div className="fw-semibold">{format(day, "EEE")}</div>
                        <div>{format(day, "d")}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Time Slots */}
                <h5 className="mt-4 mb-3">Available Time Slots</h5>
                <div className="mt-4">
                  <h6 className="mb-3">
                    Available Slots for {format(selectedDate, "do MMM yyyy")}:
                  </h6>

                  {slotsLoading ? (
                    <p>Loading slots...</p>
                  ) : slotsError ? (
                    <p className="text-danger">
                      Failed to load slots. Please try again.
                    </p>
                  ) : formattedSlots && formattedSlots.length > 0 ? (
                    <div className="d-flex flex-wrap gap-2">
                      {formattedSlots.map((slot) => {
                        const isFree = slot.status === "free";
                        const isSelected = selectedSlotId === slot.id;

                        return (
                          <button
                            key={slot.id}
                            style={{
                              backgroundColor: isFree
                                ? isSelected
                                  ? "#000" // Black for selected
                                  : "#fff" // White for unselected
                                : "#e0e0e0", // Gray for booked
                              color: isFree
                                ? isSelected
                                  ? "#fff"
                                  : "#000"
                                : "#888",
                              border: "1px solid #dddddd",
                              borderRadius: "0.5rem",
                              fontSize: "0.9rem",
                              padding: "0.5rem 1rem",
                              cursor: isFree ? "pointer" : "not-allowed",
                              opacity: isFree ? 1 : 0.6,
                              transition: "all 0.2s ease-in-out",
                            }}
                            disabled={!isFree}
                            onClick={() => {
                              if (isFree) {
                                setSelectedSlotId(slot.id);
                              }
                            }}
                          >
                            {`${slot.from} - ${slot.to}`}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p>No slots available for this day.</p>
                  )}
                </div>

                <div className="row justify-content-center mt-4">
                  <div className="col-12 col-md-8 col-lg-6">
                    {/* <a href="/checkout"> */}{" "}
                    <button
                      onClick={handleBookNow}
                      className="btn btn-dark w-100 px-4 py-3 rounded-pill shadow-sm"
                      style={{
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      Book Now
                    </button>
                    {/* </a> */}
                  </div>
                </div>
              </div>

              <div className="team-section mt-5">
                <h4 className="mb-4">Meet Our Expert Team</h4>
                <Slider {...settings}>
                  {shopDetail?.stylist.map((member, index) => (
                    <div key={index} className="text-center px-3">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/profilepic/${
                          member?.profilepic
                        }`}
                        alt={member?.name}
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          margin: "0 auto",
                        }}
                      />
                      <h5 className="mt-3 mb-1">{member?.name}</h5>
                      <p className="text-muted">{member?.designation}</p>
                    </div>
                  ))}
                </Slider>
              </div>
              {shopDetail?.ratings?.length > 0 && (
                <div className="container my-5">
                  <h4 className="mb-4">Voices from the Chair (Reviews)</h4>
                  {shopDetail?.ratings?.length > 0 && (
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="star-rating"
                        style={{
                          color: "#f5c518",
                          fontSize: "18px",
                        }}
                      >
                        {shopDetail && renderStars(shopDetail?.average, 22)}
                      </div>
                      <span
                        className="fw-bold ms-2"
                        style={{ marginTop: "6px", fontSize: "18px" }}
                      >
                        {Math.ceil(shopDetail.average)}
                      </span>
                      <span
                        className="ms-2 text-primary mt-1"
                        style={{ cursor: "pointer", marginTop: "2px" }}
                      >
                        {`(${shopDetail?.ratings?.length})`}
                      </span>
                    </div>
                  )}

                  <div className="row">
                    {shopDetail?.ratings?.map((review, idx) => {
                      const isExpanded = expandedReviews[idx];

                      const description = review?.review_description ?? "";
                      const shouldTruncate = description.length > maxChars;

                      const displayText = isExpanded
                        ? description
                        : description.slice(0, maxChars) +
                          (shouldTruncate ? "..." : "");

                      return (
                        <div className="col-md-6 mb-4" key={idx}>
                          <div className="d-flex align-items-start gap-3">
                            {review?.profilePic ? (
                              <img
                                src={`${
                                  import.meta.env.VITE_API_BASE_URL
                                }/profilepic/${review?.profilePic}`}
                                alt={`${review?.firstname ?? ""} ${
                                  review?.lastname ?? ""
                                }`}
                                width={45}
                                height={45}
                                style={{
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                  flexShrink: 0,
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 45,
                                  height: 45,
                                  borderRadius: "50%",
                                  backgroundColor: "#000000",
                                  color: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                  flexShrink: 0,
                                }}
                              >
                                {(review?.firstname || "").toUpperCase()}
                              </div>
                            )}

                            {/* Content */}
                            <div>
                              <h6 className="mb-0">
                                {`${review?.firstname ?? ""} ${
                                  review?.lastname ?? ""
                                }`}
                              </h6>
                              <small className="text-muted">
                                {review?.updated_at
                                  ? moment(review.updated_at).format(
                                      "ddd, D MMM, YYYY [at] h:mm A"
                                    )
                                  : ""}
                              </small>

                              {/* Rating */}
                              <div className="d-flex mt-2 mb-1">
                                {[...Array(Number(review?.rating ?? 0))].map(
                                  (_, i) => (
                                    <MdStar
                                      key={i}
                                      className="me-1"
                                      size={20}
                                      style={{ color: "#f5c518" }}
                                    />
                                  )
                                )}
                              </div>

                              {/* Description with toggle */}
                              <p className="mb-0">
                                {displayText}{" "}
                                {shouldTruncate && (
                                  <span
                                    className="text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => toggleReadMore(idx)}
                                  >
                                    {isExpanded ? "Read less" : "Read more"}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="mb-4 d-block d-md-none">
                <div className="service-list-box wow fadeInUp">
                  <h3 className="mb-3 fw-semibold text-dark">Amenities</h3>

                  <div className="service-list-entry">
                    {Array.isArray(shopDetail?.aminities) &&
                    shopDetail.aminities.length > 0 ? (
                      <ul className="list-unstyled mb-0">
                        {shopDetail.aminities.map((item) => (
                          <li
                            key={item.aminity_id}
                            className="d-flex align-items-center gap-3 py-2 border-bottom"
                          >
                            <span
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                backgroundColor: "#f1f1f1",
                              }}
                            >
                              <Icon icon={item.icon} width="20" height="20" />
                            </span>

                            <span className="fw-medium text-dark">
                              {item.aminity_name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">No amenities available.</p>
                    )}
                  </div>
                </div>
                <div className="container">
                  <h4 className="mb-4">Business Hours</h4>
                  <div className="row">
                    {days.map((day, idx) => (
                      <div
                        key={idx}
                        className="d-flex justify-content-between align-items-center py-2 border-0 col-12"
                      >
                        <div className="d-flex align-items-center gap-2">
                          {/* Dot and Day */}
                          <span
                            style={{
                              width: "12px",
                              height: "12px",
                              backgroundColor:
                                day === matchToday ? "#000" : "#777",
                              borderRadius: "400px 400px 50px 400px",
                              flexShrink: 0,
                            }}
                          ></span>
                          <span
                            className={`mb-0 ${
                              day === matchToday ? "fw-bold" : ""
                            }`}
                          >
                            {day}
                          </span>
                        </div>

                        {/* Time */}
                        <span
                          className={`mb-0 ${
                            day === matchToday ? "fw-bold" : ""
                          }`}
                        >
                          {hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4 mt-3">
                  <h5 className="fw-bold mb-3">Location</h5>
                  <div className="d-flex align-items-center justify-content-between gap-1">
                    <div className="d-flex align-items-center gap-1 mr-3">
                      {/* <MdLocationOn size={20} className="text-dark" /> */}
                      {/* <p
                          className="mb-0 text-dark fw-medium text-capitalize"
                          style={{
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          {(shopDetail?.address?.addressLine1 || "") +
                            " " +
                            (shopDetail?.address?.addressLine2 || "")}
                        </p> */}
                      <p
                        className="mb-0 text-dark fw-medium text-capitalize"
                        style={{
                          wordWrap: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {[
                          shopDetail?.address?.addressLine1,
                          shopDetail?.address?.addressLine2,
                          shopDetail?.address?.area,
                          shopDetail?.address?.city,
                          shopDetail?.address?.district,
                        ]
                          .filter(Boolean)
                          .join(", ") || "Address not available"}
                      </p>
                    </div>

                    {/* Forward arrow icon */}
                    <IoArrowForward
                      size={20}
                      color=""
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  {/* Embedded Google Map */}

                  <div className="ratio ratio-16x9 rounded overflow-hidden mb-3">
                    <iframe
                      src={`https://maps.google.com/maps?q=${shopDetail?.address?.location?.coordinates[1]},${shopDetail?.address?.location?.coordinates[0]}&z=15&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Google Map Location"
                    ></iframe>
                  </div>

                  {/* Address + Button */}
                  <div className="row align-items-center">
                    {/* Address Left */}
                    <div className="col-12 col-md-8 mb-2 mb-md-0 d-flex align-items-start gap-2">
                      <MdLocationOn size={20} className="text-dark mt-1 " />
                      <p
                        className="mb-0 text-dark fw-medium text-capitalize"
                        style={{ wordWrap: "break-word", whiteSpace: "normal" }}
                      >
                        {(shopDetail?.address?.addressLine1 || "") +
                          " " +
                          (shopDetail?.address?.addressLine2 || "")}
                      </p>
                    </div>

                    {/* Button Right */}
                    <div className="col-12 col-md-4 text-md-end">
                      <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark px-4 py-3 rounded-pill"
                      >
                        View Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div class="container-fluid px-0 px-sm-4 px-md-5 px-lg-5 px-xl-5">
          <div className="row d-flex flex-wrap " style={{ rowGap: "1.5rem" }}>
            <div className="mb-4">
              <h2 className="fw-bold text-dark text-center">Nearby Stores</h2>
            </div>
            {Array.isArray(shopDetail?.nearbystores) &&
            shopDetail.nearbystores.length > 0 ? (
              shopDetail.nearbystores.map((service, index) => (
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
                                  aspectRatio: "18 / 9", // maintain 4:3
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
                        onClick={(e) =>
                          handleRelatedStoreFavourite(e, service.store_id)
                        }
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
                                style={{
                                  marginRight: "4px",
                                }}
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
              <div className="col-12 text-center py-5">
                <h5 className="text-muted">
                  No nearby stores available at the moment.
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDetail;
