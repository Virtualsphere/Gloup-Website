import React, { useState } from 'react';
import { Home, Search, Heart, Calendar } from 'lucide-react';

const Footer = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Explore', icon: Search },
    { name: 'Favorites', icon: Heart },
    { name: 'Bookings', icon: Calendar }
  ];

  return (
    <footer className="fixed bottom-0 z-20 left-0 right-0 bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.15)]">
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          
          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className="flex flex-col items-center justify-center gap-1 min-w-[60px] transition-colors"
            >
              <Icon 
                size={24} 
                className={isActive ? 'text-black' : 'text-gray-400'}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span 
                className={`text-xs ${isActive ? 'text-black font-semibold' : 'text-gray-400'}`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
