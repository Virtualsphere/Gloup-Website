import React from 'react';

const TABS = ['Upcoming', 'Completed', 'Cancelled'];

const BookingTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="px-4 lg:px-10 xl:px-32 py-3 bg-white border-b border-gray-100">
      <div className="flex items-center bg-gray-100 rounded-2xl p-1 gap-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? 'bg-black text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookingTabs;
