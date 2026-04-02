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
            {/* App Download Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://apps.apple.com/sg/app/gloup-salons-spas-near-you/id6752922662" target='_blank'
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl  transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="text-[9px] text-gray-300">Download on the</span>
                  <span className="text-sm font-semibold">App Store</span>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.gloup.userapp"
                target='_blank'
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl  transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.18 23.76c.3.17.65.19.98.07l12.65-7.32-2.7-2.7z" fill="#EA4335"/>
                  <path d="M22.14 10.31 19.5 8.82l-3.03 3.03 3.03 3.03 2.67-1.54a1.52 1.52 0 0 0 0-3.03z" fill="#FBBC05"/>
                  <path d="m3.18.24 12.64 7.32-2.7 2.7L.98.31A1.2 1.2 0 0 1 3.18.24z" fill="#4285F4"/>
                  <path d="M3.18 23.76.98 22.7A1.2 1.2 0 0 1 .18 21.6V2.4c0-.48.3-.9.8-1.1l12.64 11.55z" fill="#34A853"/>
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="text-[9px] text-gray-300">GET IT ON</span>
                  <span className="text-sm font-semibold">Google Play</span>
                </div>
              </a>
            </div>

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
              <Link to="/partner-with-us" className="hover:text-gray-900 transition-colors w-fit">Partner With Us</Link>
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
              <a href="https://wa.me/917538808796" target='_blank' rel='noopener noreferrer' className="hover:text-gray-900 transition-colors w-fit">WhatsApp</a>
              <a href="mailto:contact@gloup.in" target='_blank' rel='noopener noreferrer' className="hover:text-gray-900 transition-colors w-fit">Email</a>
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
