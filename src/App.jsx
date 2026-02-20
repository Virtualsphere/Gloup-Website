  import React from "react";
import Layout from "./componets/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import ShopDetails from "./pages/ShopDetails";
import BookSlot from "./pages/BookSlot";
import ReviewOrderPage from "./pages/ReviewOrderPage";
  // import { BrowserRouter as Router, } from "react-router-dom";
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
      <div className="bg-gray-200">
         <Layout>
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop-details" element={<ShopDetails />} />
          <Route path="/book-slot" element={<BookSlot />} />
          <Route path="/review-order" element={<ReviewOrderPage />} />
        </Routes>
        </Layout>
      </div>
     </>
    );
  }

  export default App;
