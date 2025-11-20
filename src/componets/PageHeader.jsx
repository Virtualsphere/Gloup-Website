import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets/images";
import { BiSearchAlt } from "react-icons/bi";
import { Modal } from "bootstrap";
import "../styles/custom.css";
import "../styles/all.mim.css";
import "../styles/animate.css";
import "../styles/bootstrap.min.css";
import "../styles/magnific-popup.css";
import "../styles/slicknav.min.css";
import "../styles/swiper-bundle.min.css";
import { useDispatch, useSelector } from "react-redux";
import { X, UserRound, Bell } from "lucide-react";
import { getNotification } from "../redux/slice/notificationSlice";
import moment from "moment";

const PageHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const searchRef = useRef(null);
  const notificationRef = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const toggleNotification = () => setShowNotification((prev) => !prev);
  const toggleSubmenu = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setSubmenuOpen(!submenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    };

    if (showNotification) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotification]);

  useEffect(() => {
    dispatch(getNotification());
  }, []);
  let notification = useSelector((state) => state.notification.allNotification);

  // Close menu when clicking outside or resizing window
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isMenuOpen && !event.target.closest(".navbar")) {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 991 && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);
  const handleMenuItemClick = () => {
    closeMenu();
    setSubmenuOpen(false);
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };
  const onSearchSubmit = (value) => {
    alert("submit", value);
  };
  return (
    <div>
      <header
        style={{ height: "auto" }}
        className={`main-header ${isSticky ? "sticky-header" : ""}`}
      >
        <div className="header-sticky">
          {showSearch && (
            <div
              ref={searchRef}
              style={{
                position: "fixed",
                top: "125px",
                left: "10px",
                right: "10px",
                zIndex: 1050,
                background: "#1e1e1e",
                borderRadius: "20px",
                // padding: "10px",
                // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
                // border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              className="d-block d-lg-none"
            >
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{
                    fontSize: "20px",
                    backgroundColor: "#2c2c2c",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    borderTopLeftRadius: "20px",
                    borderBottomLeftRadius: "20px",
                  }}
                >
                  <BiSearchAlt />
                </span>
                <input
                  onSubmit={(e) => onSearchSubmit(e.target.value)}
                  type="search"
                  placeholder="Search shop name..."
                  className="form-control text-white"
                  style={{
                    backgroundColor: "#2c2c2c",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    padding: "10px 12px",
                    fontSize: "16px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    boxShadow: "none", // removes blue shadow on focus
                    outline: "transparent", // removes outline on mobile
                  }}
                  autoFocus
                />
              </div>
            </div>
          )}
          <nav className="navbar navbar-expand-lg">
            <div
              className="container"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Link
                className="navbar-brand"
                to="/"
                style={{ paddingLeft: "20px" }}
              >
                <img
                  src={logo}
                  style={{ width: "150px", objectFit: "contain" }}
                  alt="Logo"
                />
              </Link>
              <div className="d-flex align-items-center justify-content-center gap-4">
                {/* <div className="d-flex d-lg-none">
                  <span className="search-icon" onClick={toggleSearch}>
                    <BiSearchAlt className="icon" />
                  </span>
                </div> */}

                {/* Notification Icon */}
                <div className="position-relative d-block d-lg-none">
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

                <button
                  style={{ background: "red" }}
                  className="navbar-toggler custom-toggler mr-3"
                  type="button"
                  onClick={toggleMenu}
                  aria-controls="navbarNav"
                  aria-expanded={isMenuOpen ? "true" : "false"}
                  aria-label="Toggle navigation"
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
              {/* <div style={{ color: "white" }} className="d-none d-lg-block"> */}
              {/* <div className="search-container d-none d-lg-block">
                <form className="form-inline position-relative">
                  <input
                    className="form-control rounded-pill pl-4 pr-5"
                    type="search"
                    placeholder="Shop name"
                    aria-label="Search"
                    style={{
                      width: "320px",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #000000",
                      paddingRight: "40px",
                    }}
                  />
                  <button
                    className="btn position-absolute"
                    type="submit"
                    style={{
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "transparent",
                    }}
                  >
                    <BiSearchAlt size={20} />
                  </button>
                </form>
              </div> */}
              {/* </div> */}
              <div className="d-none d-lg-block">
                <div
                  className={`collapse navbar-collapse main-menu ${
                    isMenuOpen ? "show" : ""
                  }`}
                  id="navbarNav"
                >
                  <ul className="navbar-nav ml-auto" id="menu">
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/"
                        onClick={handleMenuItemClick}
                      >
                        Home
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/about"
                        onClick={handleMenuItemClick}
                      >
                        About us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/contact"
                        onClick={handleMenuItemClick}
                      >
                        Contact
                      </Link>
                    </li> */}
                    {/* <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/profile"
                        onClick={handleMenuItemClick}
                      >
                        Profile
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/download"
                        onClick={handleMenuItemClick}
                      >
                        Download App
                      </Link>
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
                    <li className="nav-item mt-2 desktop-bell-icon">
                      {/* Notification Icon */}
                      <div className="position-relative">
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
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className={`collapse navbar-collapses main-menu ${
                  isMenuOpen ? "show" : ""
                }`}
                id="navbarNav"
              >
                <div className="container">
                  <ul className="navbar-nav" id="menu">
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/"
                        onClick={handleMenuItemClick}
                      >
                        Home
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/profile"
                        onClick={handleMenuItemClick}
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/download"
                        onClick={handleMenuItemClick}
                      >
                        Download App
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Main Menu End  */}
            </div>
          </nav>
        </div>
        {/* Notification Modal */}
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
                    <div className="flex-grow-1">
                      <h6 className="mb-1 text-white text-wrap">
                        {notif.title}
                      </h6>
                      <p className="mb-1 text-white-50 small text-wrap">
                        {notif.description}
                      </p>
                      <small className="text-muted d-block">
                        {moment(notif.date).format("DD MMM YYYY, hh:mm A")}
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
      </header>

      {/* Add some custom CSS to ensure proper styling */}
      <style jsx>{`
        .sticky-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background-color: rgba(0, 0, 0, 0.9);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        /* Modern hamburger menu styles */
        .custom-toggler {
          border: none !important;
          padding: 0 !important;
          width: 40px;
          height: 40px;
          position: relative;
          background: transparent !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hamburger-menu {
          width: 30px;
          height: 20px;
          position: relative;
          transform: rotate(0deg);
          transition: 0.5s ease-in-out;
        }

        .hamburger-menu .line {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          background: white;
          border-radius: 9px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: 0.25s ease-in-out;
        }

        .hamburger-menu .line-1 {
          top: 0px;
        }

        .hamburger-menu .line-2 {
          top: 9px;
        }

        .hamburger-menu .line-3 {
          top: 18px;
        }

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

        /* Improved smooth collapse transition */

        .navbar-collapse {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.95);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.645, 0.045, 0.355, 1),
            opacity 0.4s ease, transform 0.4s ease;
          transform-origin: top;
          transform: scaleY(0);
          opacity: 0;
          pointer-events: none;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          z-index: 1000;
        }

        .navbar-collapse.show {
          max-height: 100vh;
          transform: scaleY(1);
          opacity: 1;
          pointer-events: auto;
          transition: max-height 0.5s ease-in-out, opacity 0.4s ease,
            transform 0.4s ease;
        }

        /* Nav items animation */
        .navbar-nav {
          padding: 20px 0;
          margin: 0;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .navbar-collapse.show .navbar-nav {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }

        /* Nav item staggered animation */
        .navbar-nav .nav-item {
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease-out;
        }

        .navbar-collapse.show .nav-item {
          opacity: 1;
          transform: translateY(0);
        }

        .navbar-collapse.show .nav-item:nth-child(1) {
          transition-delay: 0.1s;
        }
        .navbar-collapse.show .nav-item:nth-child(2) {
          transition-delay: 0.15s;
        }
        .navbar-collapse.show .nav-item:nth-child(3) {
          transition-delay: 0.2s;
        }
        .navbar-collapse.show .nav-item:nth-child(4) {
          transition-delay: 0.25s;
        }
        .navbar-collapse.show .nav-item:nth-child(5) {
          transition-delay: 0.3s;
        }
        .navbar-collapse.show .nav-item:nth-child(6) {
          transition-delay: 0.35s;
        }
        .navbar-collapse.show .nav-item:nth-child(7) {
          transition-delay: 0.4s;
        }

        .navbar-collapses {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.95);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.645, 0.045, 0.355, 1),
            opacity 0.4s ease, transform 0.4s ease;
          transform-origin: top;
          transform: scaleY(0);
          opacity: 0;
          pointer-events: none;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          z-index: 1000;
        }

        .navbar-collapses.show {
          max-height: 100vh;
          transform: scaleY(1);
          opacity: 1;
          pointer-events: auto;
          transition: max-height 0.5s ease-in-out, opacity 0.4s ease,
            transform 0.4s ease;
        }
        .navbar-collapses.show .navbar-nav {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }
        .navbar-collapses.show .nav-item {
          opacity: 1;
          transform: translateY(0);
        }

        .navbar-collapses.show .nav-item:nth-child(1) {
          transition-delay: 0.1s;
        }
        .navbar-collapses.show .nav-item:nth-child(2) {
          transition-delay: 0.15s;
        }
        .navbar-collapses.show .nav-item:nth-child(3) {
          transition-delay: 0.2s;
        }
        .navbar-collapses.show .nav-item:nth-child(4) {
          transition-delay: 0.25s;
        }
        .navbar-collapses.show .nav-item:nth-child(5) {
          transition-delay: 0.3s;
        }
        .navbar-collapses.show .nav-item:nth-child(6) {
          transition-delay: 0.35s;
        }
        .navbar-collapses.show .nav-item:nth-child(7) {
          transition-delay: 0.4s;
        }

        /* Smooth dropdown transition */
        .dropdown-menu {
          transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          display: block !important;
          visibility: hidden;
        }

        .dropdown-menu.show {
          max-height: 500px;
          opacity: 1;
          visibility: visible;
        }

        @media (max-width: 991px) {
          .navbar-collapse {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            width: 100%;
          }

          .navbar-collapse.show {
            display: block !important;
            overflow-y: auto;
            padding-bottom: 15px;
          }

          .navbar-collapses {
            display: flex !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            width: 100%;
          }

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
          .navbar-collapses.show {
            display: block !important;
            overflow-y: auto;
            padding-bottom: 15px;
          }

          .navbar-nav {
            margin-top: 0;
            padding: 20px 0px;
          }

          .dropdown-menu.show {
            margin-left: 15px;
            border: none;
            background: transparent;
          }

          .dropdown-menu .dropdown-item {
            color: rgba(255, 255, 255, 0.8);
            padding: 8px 15px;
          }

          .dropdown-menu .dropdown-item:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
          }

          .nav-item {
            padding: 2px 0;
          }

          .highlighted-menu {
            margin-top: 10px;
          }

          .highlighted-menu .nav-link {
            display: inline-block;
            padding: 8px 25px;
            background: #007bff;
            border-radius: 30px;
            color: white;
            text-align: center;
          }
        }

        @media (min-width: 992px) {
          .navbar-collapse {
            position: static;
            max-height: none !important;
            overflow: visible;
            background-color: transparent;
            box-shadow: none;
            opacity: 1;
            transform: none;
            pointer-events: auto;
            display: flex !important;
          }
          .navbar-collapses {
            position: static;
            max-height: none !important;
            overflow: visible;
            background-color: transparent;
            box-shadow: none;
            opacity: 1;
            transform: none;
            pointer-events: auto;
            display: none !important;
          }

          .navbar-nav {
            opacity: 1;
            transform: none;
            padding: 0;
          }

          .navbar-nav .nav-item {
            opacity: 1;
            transform: none;
          }

          .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 0;
            background: white;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: transform 0.3s ease, opacity 0.3s ease,
              visibility 0.3s ease;
            will-change: transform, opacity, visibility;
          }

          .nav-item:hover > .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PageHeader;
