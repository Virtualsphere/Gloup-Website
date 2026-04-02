import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// ── Always-eager (shell, needed on every route) ───────────────────────────────
import Layout from "./componets/layout/Layout";
import LoginModal from "./componets/login/LoginModal";
import ProtectedRoute from "./componets/ProtectedRoute";
import ScrollToTop from "./componets/shared/ScrollToTop";
import CustomMapsProvider from "./store/CustomMapsProvider";

// ── Skeleton fallbacks ────────────────────────────────────────────────────────
import {
  HomeSkeleton,
  ShopDetailsSkeleton,
  ExploreSkeleton,
  ListPageSkeleton,
  BookingFlowSkeleton,
  ProfileSkeleton,
  TextPageSkeleton,
} from "./componets/shared/PageSkeletons";

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
const PartnerWithUs            = lazy(() => import("./pages/PartnerWithUs"));

// ── Typed Suspense helpers ────────────────────────────────────────────────────
const S = (fallback) => ({ children }) => (
  <Suspense fallback={fallback}>{children}</Suspense>
);

const SHome    = S(<HomeSkeleton />);
const SShop    = S(<ShopDetailsSkeleton />);
const SExplore = S(<ExploreSkeleton />);
const SList    = S(<ListPageSkeleton />);
const SBooking = S(<BookingFlowSkeleton />);
const SProfile = S(<ProfileSkeleton />);
const SText    = S(<TextPageSkeleton />);
const SMap     = S(<div className="w-full h-screen bg-gray-200 animate-pulse" />);

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
            <Route path="/"                            element={<SHome><Home /></SHome>} />
            <Route path="/login"                       element={<SText><Login /></SText>} />
            <Route path="/explore"                     element={<SExplore><ExploreSalonsPage /></SExplore>} />
            <Route path="/explore-salons"              element={<SMap><MapLayout /></SMap>} />
            <Route path="/salon-details/:id"           element={<SShop><ShopDetails /></SShop>} />
            <Route path="/salons/category/:categoryId" element={<SList><SaloonCategoryPage /></SList>} />
            <Route path="/about"                       element={<SText><About /></SText>} />
            <Route path="/partner-with-us"             element={<SText><PartnerWithUs /></SText>} />

            {/* ── Footer / legal ── */}
            <Route path="/privacy-policy"              element={<SText><PrivacyPolicy /></SText>} />
            <Route path="/refund-policy"               element={<SText><RefundCancellationPolicy /></SText>} />
            <Route path="/terms-conditions"            element={<SText><TermsAndConditions /></SText>} />

            {/* ── Protected pages ── */}
            <Route path="/:id/book-slot"
              element={<ProtectedRoute><SBooking><BookSlot /></SBooking></ProtectedRoute>}
            />
            <Route path="/:id/review-order"
              element={<ProtectedRoute><SBooking><ReviewOrderPage /></SBooking></ProtectedRoute>}
            />
            <Route path="/favourite"
              element={<ProtectedRoute><SList><FavouritesPage /></SList></ProtectedRoute>}
            />
            <Route path="/my-bookings"
              element={<ProtectedRoute><SList><MyBooking /></SList></ProtectedRoute>}
            />

            {/* ── Profile nested layout ── */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <SProfile><AccountLayout /></SProfile>
                </ProtectedRoute>
              }
            >
              <Route index          element={<SProfile><ProfileDetails /></SProfile>} />
              <Route path="details"  element={<SProfile><ProfileDetails /></SProfile>} />
              <Route path="settings" element={<SProfile><SettingsPage /></SProfile>} />
              <Route path="invite"   element={<SProfile><Invite /></SProfile>} />
              <Route path="support"  element={<SProfile><Support /></SProfile>} />
            </Route>

          </Routes>
        </Layout>
      </div>
    </CustomMapsProvider>
  );
}

export default App;
