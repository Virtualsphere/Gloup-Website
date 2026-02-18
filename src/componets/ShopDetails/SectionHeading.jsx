import React from 'react';

const SectionHeading = ({ activeTab, onTabClick }) => {
  const tabs = [
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'team', label: 'Team' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="md:hidden bg-white border-b border-gray-200">
      <div className="flex overflow-x-auto scrollbar-hide px-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.label)}
            className={`px-4 py-4 text-base font-medium whitespace-nowrap flex-shrink-0 transition-colors ${
              activeTab === tab.label
                ? 'text-gray-900'
                : 'text-gray-400'
            }`}
          >
            <span className={`relative ${activeTab === tab.label ? 'after:absolute after:bottom-[-16px] after:left-0 after:right-0 after:h-[2px] after:bg-black' : ''}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionHeading;
