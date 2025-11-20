// src/components/Routes.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy loading for all pages
const HomePage = lazy(() => import("../src/pages/Home"));
const AboutPage = lazy(() => import("../src/pages/About"));
const SingleBlogPage = lazy(() => import("../src/componets/SingleBlog"));
const ShopDetailPage = lazy(() => import("../src/componets/ShopDetail"));
const BlogPage = lazy(() => import("../src/pages/Blogs"));
const ShopListPage = lazy(() => import("./componets/ShopList"));
const ContactPage = lazy(() => import("../src/pages/Contact"));
const FaqPage = lazy(() => import("../src/pages/Faq"));
const NotFoundPage = lazy(() => import("../src/pages/NotFound"));
const LoginPage = lazy(() => import("../src/pages/Login"));
const Favourites = lazy(() => import("../src/pages/Favourites"));
const MyReview = lazy(() => import("../src/pages/MyReviewList"));

const RegistrationPage = lazy(() => import("../src/pages/Registration"));
const OtpVerificationPage = lazy(() => import("../src/pages/OtpVeification"));
const ProfilePage = lazy(() => import("../src/pages/Profile"));
const TermsAndConditionsPage = lazy(() =>
  import("../src/pages/TermsAndConditions")
);
const RefundPage = lazy(() => import("../src/pages/Refund"));
const PrivacyPolicyPage = lazy(() => import("../src/pages/PrivacyPolicy"));
const PriceListPage = lazy(() => import("../src/componets/PriceList"));
const CheckoutPage = lazy(() => import("../src/componets/Checkout"));
const MyAppointmentPage = lazy(() => import("../src/pages/MyAppointments"));
const PaymentSuccessPage = lazy(() => import("../src/pages/PaymentSuccess"));
const PaymentFailedPage = lazy(() => import("../src/pages/PaymentFailed"));
const CategoryshopPage = lazy(() => import("../src/pages/CategoryShop"));
const DownloadPage = lazy(() => import("../src/pages/DownloadPage"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="page-loading">
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  </div>
);

import Loader from "./componets/Loader";

// import Checkout from "./componets/Checkout";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/singleblog" element={<SingleBlogPage />} />
        <Route path="/shopdetail/:id" element={<ShopDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/shoplist" element={<ShopListPage />} />
        <Route path="/categoryshoplist/:id" element={<CategoryshopPage />} />
        <Route path="/pricelist" element={<PriceListPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/otpverification" element={<OtpVerificationPage />} />
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditionsPage />}
        />
        <Route path="/cancellation-refund" element={<RefundPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/myappointments" element={<MyAppointmentPage />} />
        <Route path="/paymentsuccess" element={<PaymentSuccessPage />} />
        <Route path="/paymentfailed" element={<PaymentFailedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
