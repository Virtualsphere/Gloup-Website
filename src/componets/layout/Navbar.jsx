import React from 'react'
import { Menu } from 'lucide-react'

const Navbar = () => {
  return (
    <>
      {/* Mobile Navbar - Only visible on mobile */}
      <nav className="md:hidden sticky top-0 left-0 right-0 w-[100%] bg-white z-50 border-b border-gray-100 h-[80px]">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/main-logo.png" 
              alt="Gloup" 
              className="w-20 invert"
            />
          </div>

          {/* Menu Icon Button */}
          <button 
            className="text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu size={28} strokeWidth={2} />
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar;