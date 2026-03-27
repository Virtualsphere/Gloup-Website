import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const DeskFooter = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="px-6 lg:px-10 xl:px-32 w-full">
        <div className="px-2 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand & Social Column */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
            <Link to="/" className="inline-block">
              <img src="/main-logo.png" alt="Gloup" className="w-32 invert" />
            </Link>
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-[280px]">
              Discover top salons, spas, and grooming studios near you. Book and glow with GloUp.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://www.facebook.com/profile.php?id=61576019464366" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors">
                <Facebook size={18} fill="currentColor" strokeWidth={0} />
              </a>
              <a href="https://www.youtube.com/channel/UCRgZweOP89YvztGNS7y6PKA" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors">
               <Youtube size={18}  />
              </a>
              <a href="https://www.instagram.com/gloupoffl/" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/105108604/admin/dashboard/" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors">
                <Linkedin size={18} fill="currentColor" strokeWidth={0} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="col-span-1 flex flex-col gap-5 md:pl-8">
            <h3 className="text-lg font-serif font-semibold text-gray-900">Company</h3>
            <div className="flex flex-col gap-4 text-[15px] text-gray-500">
              <Link to="/about" className="hover:text-gray-900 transition-colors w-fit">About Us</Link>
              <Link to="#" className="hover:text-gray-900 transition-colors w-fit">Partner With Us</Link>
              <Link to="#" className="hover:text-gray-900 transition-colors w-fit">Careers</Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="col-span-1 flex flex-col gap-5">
            <h3 className="text-lg font-serif font-semibold text-gray-900">Legal</h3>
            <div className="flex flex-col gap-4 text-[15px] text-gray-500">
              <Link to="/privacy-policy" className="hover:text-gray-900 transition-colors w-fit">Privacy Policy</Link>
              <Link to="/terms-conditions" className="hover:text-gray-900 transition-colors w-fit">Terms of Service</Link>
              <Link to="/refund-policy" className="hover:text-gray-900 transition-colors w-fit">Refund Policy</Link>
            </div>
          </div>

          {/* Contact Links */}
          <div className="col-span-1 flex flex-col gap-5">
            <h3 className="text-lg font-serif font-semibold text-gray-900">Contact Us</h3>
            <div className="flex flex-col gap-4 text-[15px] text-gray-500">
              <Link to="#" className="hover:text-gray-900 transition-colors w-fit">WhatsApp</Link>
              <Link to="#" className="hover:text-gray-900 transition-colors w-fit">Email</Link>
              <Link to="#" className="hover:text-gray-900 transition-colors w-fit">Support</Link>
            </div>
          </div>
        </div>

      </div>
      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100">
        <p className="text-center text-[13px] text-gray-400">
          © 2026 GloUp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default DeskFooter;
