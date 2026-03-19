import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import DeskFooter from './DeskFooter';


const Layout = ({ children }) => {

  const isMobile = useMediaQuery(1024);
  const location = useLocation();
  const isMapPage = location.pathname === '/explore-map';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {!isMapPage && (isMobile ? <Footer /> : <DeskFooter />)}
    </div>
  );
};

export default Layout;
