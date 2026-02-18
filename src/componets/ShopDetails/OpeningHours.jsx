import React from 'react';

const OpeningHours = () => {
  const hours = [
    { day: 'Monday', time: '06:30 AM – 09:30 PM', isToday: false },
    { day: 'Tuesday', time: '06:30 AM – 09:30 PM', isToday: false },
    { day: 'Wednesday', time: '06:30 AM – 09:30 PM', isToday: false },
    { day: 'Thursday', time: '06:30 AM – 09:30 PM', isToday: false },
    { day: 'Friday', time: '06:30 AM – 09:30 PM', isToday: false },
    { day: 'Saturday', time: '06:30 AM – 09:30 PM', isToday: false },
    { day: 'Sunday', time: '06:30 AM – 09:30 PM', isToday: true },
  ];

  return (
    <div className="md:hidden bg-white py-6 px-5">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Opening Hours</h2>
      
      <div className="space-y-4">
        {hours.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between py-2 ${item.isToday ? 'bg-blue-50 -mx-3 px-3 rounded-lg' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.2)]"></div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">{item.day}</span>
                {item.isToday && (
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                    Today
                  </span>
                )}
              </div>
            </div>
            <span className="text-gray-500 text-sm font-medium">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpeningHours;
