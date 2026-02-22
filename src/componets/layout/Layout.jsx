import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import DeskFooter from './DeskFooter';


const Layout = ({ children }) => {

  const isMobile = useMediaQuery(768);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {isMobile ? <Footer /> : <DeskFooter />}
    </div>
  );
};

export default Layout;
