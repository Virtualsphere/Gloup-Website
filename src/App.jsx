  import React from "react";
import Layout from "./componets/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import ShopDetails from "./pages/ShopDetails";
import BookSlot from "./pages/BookSlot";
import ReviewOrderPage from "./pages/ReviewOrderPage";
import FavouritesPage from "./pages/FavouritePage";

  // import { BrowserRouter as Router, } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
      <div className="bg-gray-100">
         <Layout>
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/salon-details/:id" element={<ShopDetails />} />
          <Route path="/:id/book-slot" element={<BookSlot />} />
          <Route path="/:id/review-order" element={<ReviewOrderPage />} />
          <Route path="/favourite" element={<FavouritesPage />} />

        </Routes>
        </Layout>
      </div>
     </>
    );
  }

  export default App;
