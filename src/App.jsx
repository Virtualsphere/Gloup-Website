import React from "react";
import Layout from "./componets/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import ShopDetails from "./pages/ShopDetails";
import BookSlot from "./pages/BookSlot";
import ReviewOrderPage from "./pages/ReviewOrderPage";
import FavouritesPage from "./pages/FavouritePage";
import { Toaster } from "react-hot-toast";
import MyBooking from "./pages/MyBooking";
import LoginModal from "./componets/login/LoginModal";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProtectedRoute from "./componets/ProtectedRoute";
import RefundCancellationPolicy from "./pages/RefundCancellationPolicy";
import TermsAndConditions from "./pages/TermsConditions";
import ProfileMenu from "./pages/ProfileMenu";
import Settings from "./pages/Settings";
import About from "./pages/About";
import PopularServicesPage from "./pages/PopularServicesPage";
import TopSalonsPage from "./pages/TopSalonsPage";
  // import Header from "./componets/Header";
  // import Footer from "./componets/Footer";
  // import AppRoutes from "./routes";
  // import { Toaster } from "react-hot-toast";
  // import "../src/styles/custom.css";
  // import "../src/styles/all.mim.css";
  // import "../src/styles/animate.css";
  // import "../src/styles/bootstrap.min.css";
  // import "../src/styles/magnific-popup.css";
  // import "../src/styles/slicknav.min.css";
  // import "../src/styles/swiper-bundle.min.css";
  // import "@fortawesome/fontawesome-free/css/all.min.css";
  // import PageHeader from "./componets/PageHeader";
  // import Layout from "./Layout";

  function App() {

    return (
      // <Router>
      //   <Toaster
      //     position="top-right"
      //     toastOptions={{
      //       duration: 4000,
      //       style: {
      //         marginTop: "100px",
      //         transition: "all 0.3s ease-in-out",
      //       },
      //     }}
      //   />
      //  <Layout/>
      // </Router>

    <>
      <Toaster position="top-right" />
      {/* Global login modal — open from anywhere via useUiStore */}
      <LoginModal />
      <div className="bg-gray-100">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundCancellationPolicy />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/about" element={<About />} />
            <Route path="/popular-services" element={<PopularServicesPage />} />
            <Route path="/top-salons" element={<TopSalonsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/salon-details/:id" element={<ShopDetails />} />
            <Route path="/:id/book-slot" element={<ProtectedRoute><BookSlot /></ProtectedRoute>} />
            <Route path="/:id/review-order" element={<ProtectedRoute><ReviewOrderPage /></ProtectedRoute>} />
            <Route path="/favourite" element={<ProtectedRoute><FavouritesPage /></ProtectedRoute>} />
            <Route path="/my-bookings" element={<ProtectedRoute><MyBooking /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfileMenu /></ProtectedRoute>} />
            <Route path="/profile-details" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </div>
    </>
    );
  }

  export default App;
