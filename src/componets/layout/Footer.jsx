import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, Calendar } from 'lucide-react';
import HomeIcon from "../../assets/icons/ic_home.svg?react";
import HomeFillIcon from "../../assets/icons/ic_home_fill.svg?react";
import SearchIcon from "../../assets/icons/ic_search.svg?react";
import SearchFillIcon from "../../assets/icons/ic_search_fill.svg?react";
import HeartIcon from "../../assets/icons/ic_heart.svg?react";
import HeartFillIcon from "../../assets/icons/ic_heart_fill.svg?react";
import CalendarIcon from "../../assets/icons/ic_calendar.svg?react";
import CalendarFillIcon from "../../assets/icons/ic_calendar_fill.svg?react";

const Footer = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Home', path: '/', outlineIcon: HomeIcon, fillIcon: HomeFillIcon },
    { name: 'Explore', path: '/explore', outlineIcon: SearchIcon, fillIcon: SearchFillIcon },
    { name: 'Favorites', path: '/favourite', outlineIcon: HeartIcon, fillIcon: HeartFillIcon },
    { name: 'Bookings', path: '/my-bookings', outlineIcon: CalendarIcon, fillIcon: CalendarFillIcon }
  ];

  return (
    <footer className="fixed bottom-0 z-20 left-0 right-0 bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.15)]">
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto px-4">
        {navItems.map((item) => {
          // Check if the current route matches the item's path
          // For 'Home' ('/'), only match exactly to prevent it from matching everything
          const isActive = item.path === '/' 
            ? currentPath === '/' 
            : currentPath.startsWith(item.path);
            
          const Icon = isActive ? item.fillIcon : item.outlineIcon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center gap-1 min-w-[60px] transition-colors"
            >
              <Icon 
                width={26}
                height={26}
                className={isActive ? 'text-black' : 'text-gray-400'}
              />
              <span 
                className={`text-xs mt-1 ${isActive ? 'text-black font-semibold' : 'text-gray-400'}`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
