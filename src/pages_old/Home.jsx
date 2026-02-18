import React, { useEffect, useState, useRef } from "react";
import Banner from "../componets/Banner";
import Services from "../componets/Services";
import WhyChooseUs from "../componets/WhyChooseUs";
import Gallery from "../componets/Gallery";
import GiftsAndCards from "../componets/GiftsAndCards";
import Category from "../componets/Category";
import HomeBlogs from "../componets/HomeBlogs";
import ServicesList from "../componets/ShopList";
import NearByShops from "../componets/NearByShops";
import TopSalons from "../componets/TopSalons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllShops,
  fetchTopShops,
  fetchNearbyShops,
} from "../redux/slice/homeSlice";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useLoadScript } from "@react-google-maps/api";
import aboutImg2 from "../assets/images/B.jpg";
import { Search, MapPin, ChevronDown, Filter } from "lucide-react";
import { shopbySearchValue } from "../redux/slice/searchedListSlice";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [getLatLong, setGetLatLong] = useState({ latitude: "", longitude: "" });
  const [isLocationChange, setIsLocationChange] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchNameValue, setSearchNameValue] = useState("");
  const debouncedSearch = useDebounce(searchNameValue, 500);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    recommended: false,
    nearest: false,
    topRated: false,
  });
  const [typeOptions, setTypeOptions] = useState({
    unisex: false,
    femaleOnly: false,
    maleOnly: false,
  });
  const [isHitFavourite, setIsHitFavourite] = useState(false);
  const locationInputRef = useRef(null);

  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    dispatch(fetchTopShops());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGetLatLong({ latitude: latitude, longitude: longitude });
          dispatch(fetchAllShops({ latitude, longitude }));
          dispatch(fetchNearbyShops({ latitude, longitude }));
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          dispatch(fetchNearbyShops({ latitude: null, longitude: null }));
          dispatch(fetchAllShops({ latitude: null, longitude: null }));
        }
      );
    } else {
      console.error("Geolocation not supported");
      dispatch(fetchNearbyShops({ latitude: null, longitude: null }));
    }
  }, [dispatch, isHitFavourite]);

  useEffect(() => {
    if (!isLoaded || !window.google || autocompleteRef.current) return;
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"],
        componentRestrictions: { country: "in" },
      }
    );
    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();

      if (place && place.formatted_address && place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setGetLatLong({ latitude: lat, longitude: lng });
        dispatch(fetchNearbyShops({ latitude: lat, longitude: lng }));
        dispatch(fetchAllShops({ latitude: lat, longitude: lng }));
        const address = place.formatted_address;
        setSearchValue(address);
      }
    });
  }, [isLoaded, isLocationChange, isHitFavourite]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      dispatch(
        shopbySearchValue({
          search: debouncedSearch,
          latitude: getLatLong?.latitude,
          longitude: getLatLong?.longitude,
        })
      );
    }
  }, [debouncedSearch]);
  let searchedValue = useSelector((state) => state.searchedList.searchValue);

  const allShopsList = useSelector((state) => state.home.allShops);
  const nearByShoplist = useSelector((state) => state.home.nearByShops);
  const topsalons = useSelector((state) => state.home.topshops);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("custom-modal-backdrop")) {
      setIsSortOpen(false);
      setIsPriceOpen(false);
      setIsTypeOpen(false);
    }
  };

  const handleToggle = (key) => {
    setSortOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTypeToggle = (key) => {
    setTypeOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApplyPriceFilter = () => {
    setIsPriceOpen(false);
  };
  let banner = useSelector((state) => state.home.banner);

  const [filteredShops, setFilteredShops] = useState([]);
  const [filteredTopSalons, setFilteredTopSalons] = useState([]);
  const [filteredNearBySalons, setFilteredNearBySalons] = useState([]);

  useEffect(() => {
    if (Array.isArray(allShopsList)) {
      setFilteredShops(allShopsList); // show all shops initially
    }
    if (Array.isArray(topsalons)) {
      setFilteredTopSalons(topsalons);
    }
    if (Array.isArray(nearByShoplist)) {
      setFilteredNearBySalons(nearByShoplist);
    }
  }, [allShopsList, topsalons, nearByShoplist, isHitFavourite]);

  const isWithinRadius = (
    shopLat,
    shopLng,
    targetLat,
    targetLng,
    radiusMeters = 3000
  ) => {
    const toRad = (value) => (parseFloat(value) * Math.PI) / 180;
    const R = 6371000; // Earth radius in meters

    const lat1 = toRad(shopLat);
    const lon1 = toRad(shopLng);
    const lat2 = toRad(targetLat);
    const lon2 = toRad(targetLng);

    const dLat = lat2 - lat1;
    const dLng = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance <= radiusMeters;
  };

  const handleApplyFilter = () => {
    const matchByType = (shop) => {
      const { unisex, femaleOnly, maleOnly } = typeOptions;
      if (!unisex && !femaleOnly && !maleOnly) return true;
      // Normalize: lowercase + remove spaces
      const shopType = shop.store_type?.toLowerCase().replace(/\s+/g, "");
      return (
        (unisex && shopType === "unisex") ||
        (femaleOnly && shopType === "femaleonly") ||
        (maleOnly && shopType === "maleonly")
      );
    };
    const applyFilters = (list) => list.filter(matchByType);
    // Apply only type filter
    setFilteredShops(applyFilters(allShopsList));
    setFilteredTopSalons(applyFilters(topsalons));
    setFilteredNearBySalons(applyFilters(nearByShoplist));
  };
  const handleSelectSalon = (salon) => {
    setSearchNameValue(salon?.name);
    setIsLocationFocused(false);
    navigate(`/shopdetail/${salon?.store_id}`);
    dispatch(
      shopbySearchValue({
        search: salon.name,
        latitude: getLatLong?.latitude,
        longitude: getLatLong?.longitude,
      })
    );
  };

  return (
    <div>
      {/* <Banner /> */}
      <Category />
      <div
        className="services-lists px-3 px-sm-4 px-md-5"
        style={{ paddingTop: "50px" }}
      >
        <div className="section-title" style={{ marginBottom: "15px" }}>
          <h3 className="wow fadeInUp">Shops</h3>
          {/* <h2 className="text-anime wow fadeInUp">
            Explore Professional Salon Destinations for Every Beauty Need
          </h2> */}
        </div>

        <div
          className="container-fluid py-4"
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          <div className="row g-md-0 align-items-stretch filter-search-container">
            {/* Location Input */}
            <div className="col-12 col-sm-12 col-md px-0">
              <div
                className={`d-flex align-items-center px-3 py-3 position-relative location-search-input ${
                  isFocused ? "border-secondary shadow-sm" : ""
                }`}
                style={{
                  minWidth: "180px",
                  // borderRadius: "50px 0 0 50px",
                  transition: "all 0.2s ease",
                }}
              >
                <MapPin
                  className="me-2 text-danger"
                  style={{ width: "16px", height: "16px", flexShrink: 0 }}
                />
                <input
                  ref={inputRef}
                  type="search"
                  className="form-control border-0 bg-transparent fw-medium text-dark p-0"
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    fontSize: "14px",
                    minWidth: 0,
                  }}
                  placeholder="Enter location"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // handleLocationSubmit();
                      if (searchValue) setIsLocationChange(!isLocationChange);
                    }
                  }}
                />
              </div>
            </div>

            {/* Search Input */}
            <div className="col-12 col-sm px-0 position-relative">
              <div
                className={`d-flex align-items-center bg-white border px-3 py-3 name-search-input ${
                  isLocationFocused ? "border-secondary shadow-sm" : ""
                }`}
                style={{
                  borderRadius: "0",
                  borderRight: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <Search
                  className="me-3 text-muted"
                  style={{ width: "20px", height: "20px", flexShrink: 0 }}
                />
                <input
                  ref={locationInputRef}
                  type="search"
                  className="form-control border-0 bg-transparent p-0"
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    fontSize: "14px",
                    minWidth: 0,
                  }}
                  placeholder="Search by Salon Name"
                  value={searchNameValue}
                  onChange={(e) => setSearchNameValue(e.target.value)}
                  onFocus={() => setIsLocationFocused(true)}
                  onBlur={() => {
                    setTimeout(() => setIsLocationFocused(false), 150);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // handleLocationSubmit();
                    }
                  }}
                />
              </div>

              {isLocationFocused &&
                searchedValue?.length > 0 &&
                searchNameValue && (
                  <ul
                    className="list-group position-absolute w-100 mt-1 shadow-sm"
                    style={{
                      zIndex: 1000,
                      maxHeight: "250px",
                      overflowY: "auto",
                    }}
                  >
                    {searchedValue.map((salon) => (
                      <li
                        key={salon.store_id}
                        className="list-group-item d-flex align-items-center"
                        style={{ cursor: "pointer" }}
                        onMouseDown={() => handleSelectSalon(salon)}
                      >
                        {salon.images?.length > 0 && (
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/images/${
                              salon.images[0]
                            }`}
                            alt={salon.name}
                            style={{
                              width: "32px",
                              height: "32px",
                              objectFit: "cover",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                          />
                        )}
                        {salon.name}
                      </li>
                    ))}
                  </ul>
                )}
            </div>

            <div className="col-12 col-sm-12 col-md-auto type-filter px-0">
              <button
                className="btn d-flex align-items-center justify-content-center position-relative type-filter"
                onClick={() => setIsTypeOpen(true)}
                style={{
                  // borderRadius: "0 50px 50px 0",
                  minWidth: "120px",
                  width: "100%",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.3s ease",

                  padding: "21.5px 0px",
                }}
              >
                <Filter
                  className="me-2 "
                  style={{
                    width: "16px",
                    height: "16px",
                    // color: selectedTypes.length > 0 ? "white" : "#6c757d",
                  }}
                />
                <span
                  style={
                    {
                      // color: selectedTypes.length > 0 ? "white" : "#495057",
                    }
                  }
                >
                  Type
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 px-sm-4 px-md-5">
        {filteredNearBySalons?.length > 0 && (
          <>
            <NearByShops
              nearBy={filteredNearBySalons}
              setIsHitFavourite={setIsHitFavourite}
            />
            {/* section one */}
            <div className="container-fluid px-0 px-sm-4 px-md-5 px-lg-5 px-xl-5">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                // navigation
                // pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                spaceBetween={20}
                slidesPerView={1}
              >
                {banner
                  ?.filter(
                    (item) => item.type === "sub" && item.place === "web"
                  )
                  .map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="row justify-content-center text-center mt-5">
                        <div
                          className="col-12"
                          style={{
                            width: "100%",
                            aspectRatio: "48 / 7", // fixed ratio
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={`${
                              import.meta.env.VITE_API_BASE_URL
                            }/profilepic/${item.image}`}
                            alt="sub-section-img"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "20px",
                            }}
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </>
        )}
        {filteredShops?.length > 0 && (
          <>
            <ServicesList
              allShopsList={filteredShops}
              setIsHitFavourite={setIsHitFavourite}
            />
            {/* section two */}
            <div className="container-fluid px-0 px-sm-4 px-md-5 px-lg-5 px-xl-5">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                // navigation
                // pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                spaceBetween={20}
                slidesPerView={1}
              >
                {banner
                  ?.filter(
                    (item) => item.type === "sub2" && item.place === "web"
                  )
                  .map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="row justify-content-center text-center mt-5">
                        <div
                          className="col-12"
                          style={{
                            width: "100%",
                            aspectRatio: "48 / 7", // fixed ratio
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={`${
                              import.meta.env.VITE_API_BASE_URL
                            }/profilepic/${item.image}`}
                            alt="sub-section-img"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "20px",
                            }}
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </>
        )}
        {filteredTopSalons?.length > 0 && (
          <TopSalons
            topsalons={filteredTopSalons}
            setIsHitFavourite={setIsHitFavourite}
          />
        )}
      </div>
      {/* <Services /> */}
      {/* <WhyChooseUs /> */}
      {/* <Gallery /> */}
      {/* <GiftsAndCards /> */}
      {/* <HomeBlogs /> */}

      {isTypeOpen && (
        <div
          className="modal fade show custom-modal-backdrop d-block"
          tabIndex="-1"
          role="dialog"
          onClick={handleBackdropClick}
          style={{ backgroundColor: "rgba(6, 5, 5, 0.5)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div
              className="modal-content rounded-3 shadow"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header border-0 pb-2">
                <h5 className="modal-title fw-semibold">Select Salon Type</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setIsTypeOpen(false)}
                ></button>
              </div>

              <div className="modal-body pt-0">
                {[
                  { label: "Unisex", key: "unisex" },
                  { label: "Female Only", key: "femaleOnly" },
                  { label: "Male Only", key: "maleOnly" },
                ].map(({ label, key }) => (
                  <div
                    key={key}
                    className="d-flex justify-content-between align-items-center border-bottom py-3"
                  >
                    <label
                      htmlFor={key}
                      className="mb-0 fw-medium text-dark"
                      style={{ fontSize: "16px" }}
                    >
                      {label}
                    </label>
                    <div className="form-check form-switch m-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={key}
                        checked={typeOptions[key]}
                        onChange={() => handleTypeToggle(key)}
                        style={{
                          cursor: "pointer",
                          backgroundColor: typeOptions[key] ? "#000" : "",
                          borderColor: typeOptions[key] ? "#000" : "",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-footer border-0">
                <button
                  className="btn btn-dark w-100 py-2 rounded-pill"
                  onClick={() => {
                    handleApplyFilter();
                  }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
