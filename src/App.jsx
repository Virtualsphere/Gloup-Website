import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// ── Always-eager (shell, needed on every route) ───────────────────────────────
import Layout from "./componets/layout/Layout";
import LoginModal from "./componets/login/LoginModal";
import ProtectedRoute from "./componets/ProtectedRoute";
import ScrollToTop from "./componets/shared/ScrollToTop";
import CustomMapsProvider from "./store/CustomMapsProvider";

// ── Lazy-loaded pages ─────────────────────────────────────────────────────────
const Home                    = lazy(() => import("./pages/Home"));
const Login                   = lazy(() => import("./pages/Login"));
const ShopDetails             = lazy(() => import("./pages/ShopDetails"));
const BookSlot                = lazy(() => import("./pages/BookSlot"));
const ReviewOrderPage         = lazy(() => import("./pages/ReviewOrderPage"));
const FavouritesPage          = lazy(() => import("./pages/FavouritePage"));
const ExploreSalonsPage       = lazy(() => import("./pages/ExploreSalonsPage"));
const MyBooking               = lazy(() => import("./pages/MyBooking"));
const SaloonCategoryPage      = lazy(() => import("./pages/SaloonCategoryPage"));
const MapLayout               = lazy(() => import("./componets/map/MapLayout"));

// ── Lazy-loaded profile sub-pages ─────────────────────────────────────────────
const AccountLayout           = lazy(() => import("./componets/Account/AccountLayout"));
const ProfileDetails          = lazy(() => import("./componets/Account/ProfileDetails"));
const Invite                  = lazy(() => import("./componets/Account/Invite"));
const SettingsPage            = lazy(() => import("./componets/Account/setting"));
const Support                 = lazy(() => import("./componets/Account/support"));

// ── Footer / legal pages ──────────────────────────────────────────────────────
const PrivacyPolicy            = lazy(() => import("./pages/PrivacyPolicy"));
const RefundCancellationPolicy = lazy(() => import("./pages/RefundCancellationPolicy"));
const TermsAndConditions       = lazy(() => import("./pages/TermsConditions"));
const About                    = lazy(() => import("./pages/About"));

// ── Suspense wrapper — components handle their own skeletons internally ───────
const S = ({ children }) => (
  <Suspense fallback={null}>{children}</Suspense>
);

function App() {
  return (
    <CustomMapsProvider>
      <Toaster position="top-right" />
      <ScrollToTop />
      <LoginModal />
      <div className="bg-gray-100">
        <Layout>
          <Routes>

            {/* ── Public pages ── */}
            <Route path="/"                        element={<S><Home /></S>} />
            <Route path="/login"                   element={<S><Login /></S>} />
            <Route path="/explore"                 element={<S><ExploreSalonsPage /></S>} />
            <Route path="/explore-salons"             element={<S><MapLayout /></S>} />
            <Route path="/salon-details/:id"       element={<S><ShopDetails /></S>} />
            <Route path="/salons/category/:categoryId" element={<S><SaloonCategoryPage /></S>} />
            <Route path="/about"                   element={<S><About /></S>} />

            {/* ── Footer / legal ── */}
            <Route path="/privacy-policy"          element={<S><PrivacyPolicy /></S>} />
            <Route path="/refund-policy"           element={<S><RefundCancellationPolicy /></S>} />
            <Route path="/terms-conditions"        element={<S><TermsAndConditions /></S>} />

            {/* ── Protected pages ── */}
            <Route path="/:id/book-slot"
              element={<ProtectedRoute><S><BookSlot /></S></ProtectedRoute>}
            />
            <Route path="/:id/review-order"
              element={<ProtectedRoute><S><ReviewOrderPage /></S></ProtectedRoute>}
            />
            <Route path="/favourite"
              element={<ProtectedRoute><S><FavouritesPage /></S></ProtectedRoute>}
            />
            <Route path="/my-bookings"
              element={<ProtectedRoute><S><MyBooking /></S></ProtectedRoute>}
            />

            {/* ── Profile nested layout ── */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <S><AccountLayout /></S>
                </ProtectedRoute>
              }
            >
              <Route index          element={<S><ProfileDetails /></S>} />
              <Route path="details"  element={<S><ProfileDetails /></S>} />
              <Route path="settings" element={<S><SettingsPage /></S>} />
              <Route path="invite"   element={<S><Invite /></S>} />
              <Route path="support"  element={<S><Support /></S>} />
            </Route>

          </Routes>
        </Layout>
      </div>
    </CustomMapsProvider>
  );
}

export default App;
