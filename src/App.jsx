import React from "react";
import { BrowserRouter as Router, } from "react-router-dom";
import Header from "./componets/Header";
import Footer from "./componets/Footer";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";
import "../src/styles/custom.css";
import "../src/styles/all.mim.css";
import "../src/styles/animate.css";
import "../src/styles/bootstrap.min.css";
import "../src/styles/magnific-popup.css";
import "../src/styles/slicknav.min.css";
import "../src/styles/swiper-bundle.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PageHeader from "./componets/PageHeader";
import Layout from "./Layout";

function App() {

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            marginTop: "100px",
            transition: "all 0.3s ease-in-out",
          },
        }}
      />
     <Layout/>
    </Router>
  );
}

export default App;
