import { useState, useEffect, useRef } from "react";
import { Search, Bell, X, UserRound } from "lucide-react";
import { logo } from "../assets/images";
import { dumBanner, dumBanner2, dumBanner3 } from "../assets/images";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import aboutImg2 from "../assets/images/B.jpg";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { fetchBanners } from "../redux/slice/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../redux/slice/notificationSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const notificationImagePlaceholder = "/placeholder.svg?height=48&width=48";

// Dummy notification data for demonstration
const dummyNotifications = [
  {
    title: "New Shop Opened!",
    description:
      "A new shop 'Fashion Hub' has just opened near you. Check it out!",
    date: new Date(Date.now() - 3600 * 1000 * 24 * 2).toISOString(), // 2 days ago
    image: [notificationImagePlaceholder],
  },
  {
    title: "Special Offer!",
    description:
      "Get 20% off on all electronics this week. Limited time offer!",
    date: new Date(Date.now() - 3600 * 1000 * 3).toISOString(), // 3 hours ago
    image: [notificationImagePlaceholder],
  },
  {
    title: "Your Order Shipped",
    description: "Your order #12345 has been shipped and is on its way!",
    date: new Date().toISOString(), // now
    image: [notificationImagePlaceholder],
  },
];

export default function Header() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [isSticky, setIsSticky] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  // const [notification, setNotification] = useState(dummyNotifications);

  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBanners());
  }, []);
  let banner = useSelector((state) => state.home.banner);
  useEffect(() => {
    dispatch(getNotification());
  }, []);
  let notification = useSelector((state) => state.notification.allNotification);

  // Handle sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100); // Header becomes sticky after scrolling 100px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside search and notification panels to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowNotification(false); // Close notification if search opens
    setIsMenuOpen(false); // Close menu if search opens
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowSearch(false); // Close search if menu opens
    setShowNotification(false); // Close notification if menu opens
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
    setShowSearch(false);
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const onSearchSubmit = (value) => {
    // Implement your search logic here
  };
  let { pathname } = window.location;
  const [showPopup, setShowPopup] = useState(false);
  return (
    // <>
    //   {pathname == "/" && (
    //     <div
    //       style={{
    //         position: "relative",
    //         width: "100%",
    //         overflow: "hidden",
    //       }}
    //       className="header-banner"
    //     >
    //       {/* Swiper banner */}
    //       <Swiper
    //         modules={[Autoplay]}
    //         autoplay={{ delay: 4000, disableOnInteraction: false }}
    //         loop={true}
    //         speed={800}
    //         slidesPerView={1}
    //         style={{
    //           position: "absolute",
    //           inset: 0,
    //           zIndex: 0,
    //           width: "100%",
    //           height: "100%",
    //         }}
    //       >
    //         {banner?.map((img, idx) => (
    //           <SwiperSlide key={idx}>
    //             <img
    //               src={`${import.meta.env.VITE_API_BASE_URL}/profilepic/${
    //                 img.image
    //               }`}
    //               alt={`Banner ${idx + 1}`}
    //               style={{
    //                 width: "100%",
    //                 height: "100%",
    //                 objectFit: "cover",
    //               }}
    //             />
    //           </SwiperSlide>
    //         ))}
    //       </Swiper>

    //       {/* Your existing <header> ... code remains unchanged */}

    //       {/* Header Content - positioned relatively on top of the banner */}
    //       <header

    //         style={{
    //           position: isSticky ? "fixed" : "relative",
    //           top: 0,
    //           left: 0,
    //           width: "100%",
    //           zIndex: 100,
    //           transition: "all 0.3s ease-in-out",
    //           backgroundColor: isSticky
    //             ? "rgb(0, 0, 0)"
    //             : isMenuOpen
    //             ? "rgb(0, 0, 0)"
    //             : "transparent",

    //           boxShadow: isSticky ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none",
    //         }}
    //       >
    //         <nav className="navbar navbar-expand-lg">
    //           <div className="container d-flex justify-content-between align-items-center">
    //             {/* Logo */}
    //             <a className="navbar-brand" href="/">
    //               <img
    //                 src={logo || "/placeholder.svg"}
    //                 style={{ width: "150px", objectFit: "contain" }}
    //                 alt="Logo"
    //               />
    //             </a>

    //             {/* Mobile Icons (Search, Notification, Toggler) */}
    //             <div className="d-flex align-items-center gap-4 d-lg-none">
    //               {/* <span
    //             className="search-icon"
    //             onClick={toggleSearch}
    //             aria-label="Toggle search"
    //           >
    //             <Search />
    //           </span> */}
    //               <div className="position-relative">
    //                 <span
    //                   className="notification-icon search-icon"
    //                   onClick={toggleNotification}
    //                   aria-label="Toggle notifications"
    //                 >
    //                   <Bell />
    //                 </span>
    //               </div>
    //               <button
    //                 className="navbar-toggler custom-toggler mr-3"
    //                 type="button"
    //                 onClick={toggleMenu}
    //                 aria-controls="navbarNav"
    //                 aria-expanded={isMenuOpen ? "true" : "false"}
    //                 aria-label="Toggle navigation"
    //                 style={{ boxShadow: "none" }}
    //               >
    //                 <div
    //                   className={`hamburger-menu ${isMenuOpen ? "active" : ""}`}
    //                 >
    //                   <span className="line line-1"></span>
    //                   <span className="line line-2"></span>
    //                   <span className="line line-3"></span>
    //                 </div>
    //               </button>
    //             </div>

    //             {/* Desktop Search */}
    //             {/* <div className="search-container d-none d-lg-block">
    //               <form className="form-inline position-relative">
    //                 <input
    //                   className="form-control rounded-pill pl-4 pr-5"
    //                   type="search"
    //                   placeholder="Shop name"
    //                   aria-label="Search"
    //                   style={{
    //                     width: "320px",
    //                     backgroundColor: "#f8f9fa",
    //                     border: "1px solid #000000",
    //                     paddingRight: "40px",
    //                   }}
    //                 />
    //                 <button
    //                   className="btn position-absolute"
    //                   type="submit"
    //                   style={{
    //                     right: "10px",
    //                     top: "50%",
    //                     transform: "translateY(-50%)",
    //                     border: "none",
    //                     background: "transparent",
    //                   }}
    //                   aria-label="Submit search"
    //                 >
    //                   <Search size={20} />
    //                 </button>
    //               </form>
    //             </div> */}

    //             {/* Desktop Navigation */}
    //             <div className="d-none d-lg-block">
    //               <div
    //                 className={`collapse navbar-collapse main-menu ${
    //                   isMenuOpen ? "show" : ""
    //                 }`}
    //                 id="navbarNav"
    //               >
    //                 <ul className="navbar-nav ml-auto" id="menu">
    //                   <li className="nav-item">
    //                     <a
    //                       className="nav-link"
    //                       href="/"
    //                       onClick={handleMenuItemClick}
    //                       style={{ color: "white" }}
    //                     >
    //                       Home
    //                     </a>
    //                   </li>
    //                   <li className="nav-item">
    //                     <a
    //                       className="nav-link"
    //                       href="/about"
    //                       onClick={handleMenuItemClick}
    //                       style={{ color: "white" }}
    //                     >
    //                       About us
    //                     </a>
    //                   </li>
    //                   <li className="nav-item">
    //                     <a
    //                       className="nav-link"
    //                       href="/contact"
    //                       onClick={handleMenuItemClick}
    //                       style={{ color: "white" }}
    //                     >
    //                       Contact
    //                     </a>
    //                   </li>
    //                   <li className="nav-item">
    //                     <a
    //                       className="nav-link"
    //                       href="/profile"
    //                       onClick={handleMenuItemClick}
    //                       style={{ color: "white" }}
    //                     >
    //                       Profile
    //                     </a>
    //                   </li>
    //                   <li className="nav-item">
    //                     <a
    //                       className="nav-link"
    //                       href="/download"
    //                       onClick={handleMenuItemClick}
    //                       style={{ color: "white" }}
    //                     >
    //                       Download App
    //                     </a>
    //                   </li>
    //                   <li className="nav-item mt-2 desktop-bell-icon">
    //                     <div className="position-relative">
    //                       <span
    //                         className="notification-icon"
    //                         onClick={toggleNotification}
    //                         aria-label="Toggle notifications"
    //                       >
    //                         <Bell
    //                           style={{
    //                             color: "#fff",
    //                             fontSize: "20px",
    //                             cursor: "pointer",
    //                           }}
    //                         />
    //                       </span>
    //                     </div>
    //                   </li>
    //                 </ul>
    //               </div>
    //             </div>

    //             {/* Mobile Navigation Menu */}
    //             <div
    //               className={`collapse navbar-collapses main-menu ${
    //                 isMenuOpen ? "show" : ""
    //               }`}
    //               id="navbarNav"
    //             >
    //               <div className="container">
    //                 <ul className="navbar-nav" id="menu">
    //                   <li className="nav-item">
    //                     <a
    //                       className="nav-link"
    //                       href="/"
    //                       onClick={handleMenuItemClick}
    //                     >
    //                       Home
    //                     </a>
    //                   </li>
    //                   <li className="nav-item">
    //                     <a
    //                       className="nav-link"
    //                       href="/about"
    //                       onClick={handleMenuItemClick}
    //                     >
    //                       About us
    //                     </a>
    //                   </li>
    //                   <li className="nav-item">
    //                     <a
    //                       className="nav-link"
    //                       href="/contact"
    //                       onClick={handleMenuItemClick}
    //                     >
    //                       Contact
    //                     </a>
    //                   </li>
    //                   <li className="nav-item">
    //                     <a
    //                       className="nav-link"
    //                       href="/profile"
    //                       onClick={handleMenuItemClick}
    //                     >
    //                       Profile
    //                     </a>
    //                   </li>
    //                   <li className="nav-item">
    //                     <a
    //                       className="nav-link"
    //                       href="/download"
    //                       onClick={handleMenuItemClick}
    //                     >
    //                       Download App
    //                     </a>
    //                   </li>
    //                 </ul>
    //               </div>
    //             </div>
    //           </div>
    //         </nav>
    //       </header>

    //       {/* Mobile Search Overlay - fixed position to float above content */}
    //       {/* {showSearch && (
    //     <div
    //       ref={searchRef}
    //       style={{
    //         position: "fixed",
    //         top: "125px",
    //         left: "10px",
    //         right: "10px",
    //         zIndex: 1050,
    //         background: "#1e1e1e",
    //         borderRadius: "20px",
    //       }}
    //       className="d-block d-lg-none"
    //     >
    //       <div className="input-group">
    //         <span
    //           className="input-group-text"
    //           style={{
    //             fontSize: "20px",
    //             backgroundColor: "#2c2c2c",
    //             border: "1px solid rgba(255, 255, 255, 0.1)",
    //             color: "#fff",
    //             borderTopLeftRadius: "20px",
    //             borderBottomLeftRadius: "20px",
    //           }}
    //         >
    //           <Search />
    //         </span>
    //         <input
    //           onKeyDown={(e) => {
    //             if (e.key === "Enter") {
    //               onSearchSubmit(e.target.value);
    //             }
    //           }}
    //           type="search"
    //           placeholder="Search shop name..."
    //           className="form-control text-white"
    //           style={{
    //             backgroundColor: "#2c2c2c",
    //             border: "1px solid rgba(255, 255, 255, 0.1)",
    //             color: "#fff",
    //             padding: "10px 12px",
    //             fontSize: "16px",
    //             borderTopRightRadius: "20px",
    //             borderBottomRightRadius: "20px",
    //             boxShadow: "none",
    //             outline: "transparent",
    //           }}
    //           autoFocus
    //         />
    //       </div>
    //     </div>
    //   )} */}

    //       {/* Notification Modal - fixed position to float above content */}
    //       {showNotification && (
    //         <div
    //           ref={notificationRef}
    //           className="notification-panel position-fixed end-0 mt-5 bg-dark text-white rounded shadow p-3"
    //           style={{
    //             zIndex: 1060,
    //             width: "320px",
    //             top: "70px",
    //             maxHeight: "400px",
    //             overflowY: "auto",
    //           }}
    //         >
    //           <div className="d-flex justify-content-between align-items-center mb-2">
    //             <h5 className="mb-0 text-white">Notifications</h5>
    //             <button
    //               onClick={toggleNotification}
    //               className="btn btn-sm btn-light d-flex align-items-center justify-content-center"
    //               style={{
    //                 padding: "4px",
    //                 borderRadius: "50%",
    //                 width: "28px",
    //                 height: "28px",
    //               }}
    //               aria-label="Close"
    //             >
    //               <X size={16} />
    //             </button>
    //           </div>
    //           <ul className="list-unstyled mb-0">
    //             {notification.length > 0 ? (
    //               notification.map((notif, idx) => (
    //                 <li
    //                   key={idx}
    //                   className="d-flex align-items-start gap-3 mb-3 p-2 rounded bg-secondary"
    //                 >
    //                   {notif.image && notif.image[0] && (
    //                     <img
    //                       src={`${import.meta.env.VITE_API_BASE_URL}/images/${
    //                         notif.image[0]
    //                       }`}
    //                       alt="notif"
    //                       className="rounded-circle"
    //                       style={{
    //                         width: "48px",
    //                         height: "48px",
    //                         objectFit: "cover",
    //                         minWidth: "48px",
    //                       }}
    //                     />
    //                   )}
    //                   <div style={{ flexGrow: 1 }}>
    //                     <h6 className="mb-1 text-white text-wrap">
    //                       {notif.title}
    //                     </h6>
    //                     <p className="mb-1 text-white-50 small text-wrap">
    //                       {notif.description}
    //                     </p>
    //                     <small className="text-muted d-block">
    //                       {new Date(notif.date).toLocaleString("en-US", {
    //                         year: "numeric",
    //                         month: "short",
    //                         day: "numeric",
    //                         hour: "2-digit",
    //                         minute: "2-digit",
    //                         hour12: true,
    //                       })}
    //                     </small>
    //                   </div>
    //                 </li>
    //               ))
    //             ) : (
    //               <li className="text-white-50 text-center">
    //                 No new notifications
    //               </li>
    //             )}
    //           </ul>
    //         </div>
    //       )}

    //       {/* Custom CSS for hamburger menu and collapse transitions */}
    //       <style>{`
    //     .search-icon {
    //       width: 37px;
    //       height: 37px;
    //       display: flex;
    //       justify-content: center;
    //       align-items: center;
    //       background: rgba(255, 255, 255, 0.15);
    //       border-radius: 50%;
    //       color: #ffffff;
    //       font-size: 30px;
    //       padding: 6px;
    //       cursor: pointer;
    //       transition: background 0.3s ease, transform 0.3s ease;
    //     }
    //     .search-icon:hover {
    //       background: rgba(255, 255, 255, 0.25);
    //       transform: scale(1.05);
    //     }
    //     .hamburger-menu {
    //       width: 30px;
    //       height: 20px;
    //       position: relative;
    //       transform: rotate(0deg);
    //       transition: 0.5s ease-in-out;
    //     }
    //     .hamburger-menu .line {
    //       display: block;
    //       position: absolute;
    //       height: 2px;
    //       width: 100%;
    //       background: white;
    //       border-radius: 9px;
    //       opacity: 1;
    //       left: 0;
    //       transform: rotate(0deg);
    //       transition: 0.25s ease-in-out;
    //     }
    //     .hamburger-menu .line-1 {
    //       top: 0px;
    //     }
    //     .hamburger-menu .line-2 {
    //       top: 9px;
    //     }
    //     .hamburger-menu .line-3 {
    //       top: 18px;
    //     }
    //     .hamburger-menu.active .line-1 {
    //       top: 9px;
    //       transform: rotate(135deg);
    //     }
    //     .hamburger-menu.active .line-2 {
    //       opacity: 0;
    //       left: -60px;
    //     }
    //     .hamburger-menu.active .line-3 {
    //       top: 9px;
    //       transform: rotate(-135deg);
    //     }
    //     /* Improved smooth collapse transition */
    //     .navbar-collapse, .navbar-collapses {
    //       position: absolute;
    //       top: 100%;
    //       left: 0;
    //       right: 0;
    //       background-color: rgba(0, 0, 0, 0.95);
    //       max-height: 0;
    //       overflow: hidden;
    //       transition: max-height 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.4s ease, transform 0.4s ease;
    //       transform-origin: top;
    //       transform: scaleY(0);
    //       opacity: 0;
    //       pointer-events: none;
    //       box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    //       z-index: 1000;
    //     }
    //     .navbar-collapse.show, .navbar-collapses.show {
    //       max-height: 100vh;
    //       transform: scaleY(1);
    //       opacity: 1;
    //       pointer-events: auto;
    //       transition: max-height 0.5s ease-in-out, opacity 0.4s ease, transform 0.4s ease;
    //     }
    //     /* Nav items animation */
    //     .navbar-nav {
    //       padding: 20px 0;
    //       margin: 0;
    //       opacity: 0;
    //       transform: translateY(-10px);
    //       transition: opacity 0.3s ease, transform 0.3s ease;
    //     }
    //     .navbar-collapse.show .navbar-nav, .navbar-collapses.show .navbar-nav {
    //       opacity: 1;
    //       transform: translateY(0);
    //       transition-delay: 0.2s;
    //     }
    //     /* Nav item staggered animation */
    //     .navbar-nav .nav-item {
    //       opacity: 0;
    //       transform: translateY(-10px);
    //       transition: all 0.3s ease-out;
    //     }
    //     .navbar-collapse.show .nav-item, .navbar-collapses.show .nav-item {
    //       opacity: 1;
    //       transform: translateY(0);
    //     }
    //     .navbar-collapse.show .nav-item:nth-child(1), .navbar-collapses.show .nav-item:nth-child(1) {
    //       transition-delay: 0.1s;
    //     }
    //     .navbar-collapse.show .nav-item:nth-child(2), .navbar-collapses.show .nav-item:nth-child(2) {
    //       transition-delay: 0.15s;
    //     }
    //     .navbar-collapse.show .nav-item:nth-child(3), .navbar-collapses.show .nav-item:nth-child(3) {
    //       transition-delay: 0.2s;
    //     }
    //     .navbar-collapse.show .nav-item:nth-child(4), .navbar-collapses.show .nav-item:nth-child(4) {
    //       transition-delay: 0.25s;
    //     }
    //     .navbar-collapse.show .nav-item:nth-child(5), .navbar-collapses.show .nav-item:nth-child(5) {
    //       transition-delay: 0.3s;
    //     }
    //     .navbar-collapse.show .nav-item:nth-child(6), .navbar-collapses.show .nav-item:nth-child(6) {
    //       transition-delay: 0.35s;
    //     }
    //     .navbar-collapse.show .nav-item:nth-child(7), .navbar-collapses.show .nav-item:nth-child(7) {
    //       transition-delay: 0.4s;
    //     }
    //     /* Smooth dropdown transition (if applicable, though not explicitly in current code) */
    //     .dropdown-menu {
    //       transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
    //       max-height: 0;
    //       opacity: 0;
    //       overflow: hidden;
    //       display: block !important;
    //       visibility: hidden;
    //     }
    //     .dropdown-menu.show {
    //       max-height: 500px;
    //       opacity: 1;
    //       visibility: visible;
    //     }
    //     @media (max-width: 991px) {
    //       .navbar-collapse {
    //         position: absolute;
    //         top: 100%;
    //         left: 0;
    //         right: 0;
    //         width: 100%;
    //       }
    //       .navbar-collapse.show {
    //         display: block !important;
    //         overflow-y: auto;
    //         padding-bottom: 15px;
    //       }
    //       .navbar-collapses {
    //         display: flex !important;
    //         position: absolute;
    //         top: 100%;
    //         left: 0;
    //         right: 0;
    //         width: 100%;
    //       }
    //       .navbar-collapses.show {
    //         display: block !important;
    //         overflow-y: auto;
    //         padding-bottom: 15px;
    //       }
    //       .navbar-nav {
    //         margin-top: 0;
    //         padding: 20px 0px;
    //       }
    //       .dropdown-menu.show {
    //         margin-left: 15px;
    //         border: none;
    //         background: transparent;
    //       }
    //       .dropdown-menu .dropdown-item {
    //         color: rgba(255, 255, 255, 0.8);
    //         padding: 8px 15px;
    //       }
    //       .dropdown-menu .dropdown-item:hover {
    //         background: rgba(255, 255, 255, 0.1);
    //         color: white;
    //       }
    //       .nav-item {
    //         padding: 2px 0;
    //       }
    //       .highlighted-menu {
    //         margin-top: 10px;
    //       }
    //       .highlighted-menu .nav-link {
    //         display: inline-block;
    //         padding: 8px 25px;
    //         background: #007bff;
    //         border-radius: 30px;
    //         color: white;
    //         text-align: center;
    //       }
    //     }
    //     @media (min-width: 992px) {
    //       .navbar-collapse {
    //         position: static;
    //         max-height: none !important;
    //         overflow: visible;
    //         background-color: transparent;
    //         box-shadow: none;
    //         opacity: 1;
    //         transform: none;
    //         pointer-events: auto;
    //         display: flex !important;
    //       }
    //       .navbar-collapses {
    //         position: static;
    //         max-height: none !important;
    //         overflow: visible;
    //         background-color: transparent;
    //         box-shadow: none;
    //         opacity: 1;
    //         transform: none;
    //         pointer-events: auto;
    //         display: none !important;
    //       }
    //       .navbar-nav {
    //         opacity: 1;
    //         transform: none;
    //         padding: 0;
    //       }
    //       .navbar-nav .nav-item {
    //         opacity: 1;
    //         transform: none;
    //       }
    //       .dropdown-menu {
    //         position: absolute;
    //         top: 100%;
    //         left: 0;
    //         margin-top: 0;
    //         background: white;
    //         box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    //         opacity: 0;
    //         visibility: hidden;
    //         transform: translateY(10px);
    //         transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
    //         will-change: transform, opacity, visibility;
    //       }
    //       .nav-item:hover > .dropdown-menu {
    //         opacity: 1;
    //         visibility: visible;
    //         transform: translateY(0);
    //       }
    //     }
    //   `}</style>
    //     </div>
    //   )}
    // </>
    <>
      {pathname == "/" && (
        <div>
          {/* ================= Header ================= */}

          <header
            style={{
              position: isSticky ? "fixed" : "relative",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 100,
              transition: "all 0.3s ease-in-out",
              // backgroundColor: isSticky
              //   ? "rgb(0, 0, 0)"
              //   : isMenuOpen
              //   ? "rgb(0, 0, 0)"
              //   : "transparent",
              backgroundColor: "rgb(0, 0, 0)",
              boxShadow: isSticky ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none",
              padding: "12px 0px",
            }}
          >
            <nav className="navbar navbar-expand-lg">
              <div className="container d-flex justify-content-between align-items-center">
                {/* Logo */}
                <a
                  className="navbar-brand"
                  href="/"
                  style={{ paddingLeft: "24px" }}
                >
                  <img
                    src={logo || "/placeholder.svg"}
                    style={{ width: "150px", objectFit: "contain" }}
                    alt="Logo"
                  />
                </a>

                {/* Mobile Icons */}
                <div className="d-flex align-items-center gap-4 d-lg-none">
                  <div className="position-relative">
                    {token && (
                      <span
                        className="notification-icon search-icon"
                        onClick={toggleNotification}
                        aria-label="Toggle notifications"
                      >
                        <Bell />
                      </span>
                    )}
                  </div>
                  <button
                    className="navbar-toggler custom-toggler mr-3"
                    type="button"
                    onClick={toggleMenu}
                    aria-controls="navbarNav"
                    aria-expanded={isMenuOpen ? "true" : "false"}
                    aria-label="Toggle navigation"
                    style={{ boxShadow: "none" }}
                  >
                    <div
                      className={`hamburger-menu ${isMenuOpen ? "active" : ""}`}
                    >
                      <span className="line line-1"></span>
                      <span className="line line-2"></span>
                      <span className="line line-3"></span>
                    </div>
                  </button>
                </div>

                {/* Desktop Navigation */}
                <div className="d-none d-lg-block">
                  <div
                    className={`collapse navbar-collapse main-menu ${
                      isMenuOpen ? "show" : ""
                    }`}
                    id="navbarNav"
                  >
                    <ul className="navbar-nav ml-auto" id="menu">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/"
                          onClick={handleMenuItemClick}
                          style={{ color: "white" }}
                        >
                          Home
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/download"
                          onClick={handleMenuItemClick}
                          style={{ color: "white" }}
                        >
                          Download App
                        </a>
                      </li>

                      <li className="nav-item desktop-bell-icon ml-5">
                        <div className="position-relative">
                          <span
                            className="notification-icon"
                            onClick={() => navigate("/profile")}
                            aria-label="Toggle notifications"
                          >
                            <UserRound
                              style={{
                                color: "#fff",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                            />
                          </span>
                        </div>
                      </li>
                      <li className="nav-item desktop-bell-icon">
                        <div className="position-relative">
                          {token && (
                            <span
                              className="notification-icon"
                              onClick={toggleNotification}
                              aria-label="Toggle notifications"
                            >
                              <Bell
                                style={{
                                  color: "#fff",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
                              />
                            </span>
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  className={`collapse navbar-collapses main-menu d-lg-none ${
                    isMenuOpen ? "show" : ""
                  } w-100`}
                  id="navbarNav"
                >
                  <div className="container p-0">
                    <ul className="navbar-nav" id="menu">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/"
                          onClick={handleMenuItemClick}
                        >
                          Home
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/profile"
                          onClick={handleMenuItemClick}
                        >
                          Profile
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/download"
                          onClick={handleMenuItemClick}
                        >
                          Download App
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </header>

          <div
            style={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              marginTop: isSticky ? "80px" : "0", // offset if header is fixed
            }}
            className="header-banner"
          >
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              speed={800}
              slidesPerView={1}
              style={{
                width: "100%",
                height: "60vh",
              }}
            >
              {/* {banner && banner.length > 0 ? (
                banner
                  .filter((img) => img.type === "main" && (img.place == "web" || img.place == "partner"))
                  .map((img, idx) => (
                    <SwiperSlide
                      key={idx}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/profilepic/${
                          img.image
                        }`}
                        alt={`Banner ${idx + 1}`}
                        onClick={()=>{img.issub == true && navigate(`/shopdetail/${img.store_id}`)}}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </SwiperSlide>
                  ))
              ) : (
                <SwiperSlide style={{ width: "100%", height: "100%" }}>
                  <img
                    src={aboutImg2}
                    alt="Fallback Banner"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </SwiperSlide>
              )} */}
              {banner && banner.length > 0 ? (
                banner
                  .filter(
                    (img) =>
                      (img.place === "web" && img.type === "main") ||
                      (img.place === "partner" && img.issub === true)
                  )
                  .map((img, idx) => (
                    <SwiperSlide
                      key={idx}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/profilepic/${
                          img.image
                        }`}
                        alt={`Banner ${idx + 1}`}
                        onClick={() => {
                          if (img.place === "partner" && img.issub === true) {
                            navigate(`/shopdetail/${img.store_id}`);
                          } else {
                            toast.error("It’s not a subscription banner ⚠️", {
                              duration: 2500,
                              style: {
                                background: "#fef2f2",
                                color: "#b91c1c",
                                border: "1px solid #fca5a5",
                              },
                            });
                          }
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          cursor:
                            img.place === "partner" && img.issub === true
                              ? "pointer"
                              : "default",
                        }}
                      />
                    </SwiperSlide>
                  ))
              ) : (
                <SwiperSlide style={{ width: "100%", height: "100%" }}>
                  <img
                    src={aboutImg2}
                    alt="Fallback Banner"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>

          {/* <img
            src={aboutImg2}
            alt=""
            style={{ width: "100%",  }}
          /> */}
          {/* ================= Notifications ================= */}
          {showNotification && (
            <div
              ref={notificationRef}
              className="notification-panel position-fixed end-0 mt-5 bg-dark text-white rounded shadow p-3"
              style={{
                zIndex: 1060,
                width: "320px",
                top: "70px",
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0 text-white">Notifications</h5>
                <button
                  onClick={toggleNotification}
                  className="btn btn-sm btn-light d-flex align-items-center justify-content-center"
                  style={{
                    padding: "4px",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                  }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
              <ul className="list-unstyled mb-0">
                {notification.length > 0 ? (
                  notification.map((notif, idx) => (
                    <li
                      key={idx}
                      className="d-flex align-items-start gap-3 mb-3 p-2 rounded bg-secondary"
                    >
                      {notif.image && notif.image[0] && (
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}/images/${
                            notif.image[0]
                          }`}
                          alt="notif"
                          className="rounded-circle"
                          style={{
                            width: "48px",
                            height: "48px",
                            objectFit: "cover",
                            minWidth: "48px",
                          }}
                        />
                      )}
                      <div style={{ flexGrow: 1 }}>
                        <h6 className="mb-1 text-white text-wrap">
                          {notif.title}
                        </h6>
                        <p className="mb-1 text-white-50 small text-wrap">
                          {notif.description}
                        </p>
                        <small className="text-muted d-block">
                          {new Date(notif.date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </small>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-white-50 text-center">
                    No new notifications
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* ================= Styles ================= */}
          <style>{`
        .search-icon {
          width: 37px;
          height: 37px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          color: #ffffff;
          font-size: 30px;
          padding: 6px;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .search-icon:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }
        .hamburger-menu {
          width: 30px;
          height: 20px;
          position: relative;
          transition: 0.5s ease-in-out;
        }
        .hamburger-menu .line {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          background: white;
          border-radius: 9px;
          transition: 0.25s ease-in-out;
        }
        .hamburger-menu .line-1 { top: 0; }
        .hamburger-menu .line-2 { top: 9px; }
        .hamburger-menu .line-3 { top: 18px; }
        .hamburger-menu.active .line-1 {
          top: 9px;
          transform: rotate(135deg);
        }
        .hamburger-menu.active .line-2 {
          opacity: 0;
          left: -60px;
        }
        .hamburger-menu.active .line-3 {
          top: 9px;
          transform: rotate(-135deg);
        }
        /* Navbar collapse styles remain unchanged */
      `}</style>
        </div>
      )}
    </>
  );
}
