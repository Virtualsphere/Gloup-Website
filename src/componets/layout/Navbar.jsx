import React, { useState } from 'react';
import { Menu, MapPin, Search, Gift, Tag, User, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 w-full bg-white z-50 border-b border-gray-100 flex items-center justify-between px-6 xl:px-32 lg:px-10 py-4 h-[80px] md:h-auto">
        {/* Left Section: Logo & Location */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img src="/main-logo.png" alt="Gloup" className="w-20 invert" />
          </Link>
          <button className="hidden lg:flex items-center gap-2 text-gray-500 font-medium hover:text-gray-800 transition-colors">
            <MapPin size={20} />
            <span>Bengaluru</span>
          </button>
        </div>

        {/* Center Section: Search (Desktop Only) */}
        <div className="hidden md:block flex-1 max-w-xl px-12">
          <div className="flex items-center gap-3 bg-[#f8f9fa] rounded-lg px-4 py-2.5 border border-gray-200 focus-within:border-gray-300 focus-within:bg-white transition-all">
            <Search size={20} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-base"
            />
          </div>
        </div>

        {/* Right Section: Mobile Menu & Desktop Links */}
        <div className="flex items-center">
          {/* Mobile Menu Icon */}
          

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-800">
            <Link to="#" className="lg:flex hidden hover:text-black transition-colors">Partner With Us</Link>
            <Link to="#" className="lg:flex hidden items-center gap-2 hover:text-black transition-colors">
              <Gift size={20} />
              <span>Buy Giftcard</span>
            </Link>
            <Link to="#" className="lg:flex hidden items-center gap-2 text-[#D4A352] hover:text-[#B4853A] transition-colors">
              <Tag size={20} />
              <span>Offers</span>
            </Link>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#114F44] text-white hover:bg-[#0A3D33] transition-colors ml-2">
              <User size={20} />
            </button>
          </div>

          <button 
            className="lg:hidden ml-4 text-black focus:outline-none"
            aria-label="Toggle menu"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={28} strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-[70] transform transition-transform duration-300 ease-in-out flex flex-col lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 pb-5">
          <img src="/main-logo.png" alt="Gloup" className="w-24 invert" />
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 -mr-2 text-gray-500 hover:text-black focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Link to="#" className="flex items-center justify-between text-[17px] font-medium text-gray-800 hover:text-black py-3 border-b border-gray-50">
              <span>Partner With Us</span>
              <ChevronRight size={18} className="text-gray-400" />
            </Link>
            <Link to="#" className="flex items-center justify-between text-[17px] font-medium text-gray-800 hover:text-black py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <Gift size={20} className="text-gray-500" />
                <span>Buy Giftcard</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </Link>
            <Link to="#" className="flex items-center justify-between text-[17px] font-medium hover:text-[#B4853A] py-3 border-b border-gray-50">
              <div className="flex items-center gap-3 text-[#D4A352]">
                <Tag size={20} />
                <span>Offers</span>
              </div>
              <ChevronRight size={18} className="text-[#D4A352] opacity-50" />
            </Link>
          </div>

          {/* Location (Mobile) */}
          <div className="mt-2">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">Location</p>
            <button className="flex items-center justify-between text-gray-800 font-medium bg-gray-50 w-full p-4 rounded-xl border border-gray-100 active:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-gray-500" />
                <span>Bengaluru</span>
              </div>
              <span className="text-xs text-[#114F44] font-semibold bg-[#114F44]/10 px-2 py-1 rounded-md">Change</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer (User Action) */}
        <div className="p-6 border-t border-gray-100 pb-8">
          <button className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-[#114F44] text-white hover:bg-[#0A3D33] transition-colors font-medium shadow-sm shadow-[#114F44]/20">
            <User size={20} />
            <span>Sign In / Register</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;