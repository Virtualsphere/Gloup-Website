import React from 'react';

const OpeningHours = ({ openingHours = {} }) => {
  // Assuming openingHours comes as an object like { Monday: "06:30 AM – 09:30 PM", Tuesday: ... }
  // Provide fallback if empty
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const hours = daysOfWeek.map(day => ({
    day,
    time: openingHours[day] || 'Closed',
    isToday: day === today
  }));

  const hasHours = openingHours && Object.keys(openingHours).length > 0;

  return (
    <div className="bg-white lg:bg-gray-100 py-6 px-5">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-6">Opening Hours</h2>
      
      {hasHours ? (
        <div className="space-y-3">
          {hours.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between lg:grid lg:grid-cols-[200px_1fr] py-2 ${item.isToday ? 'bg-blue-50 -mx-3 px-3 rounded-lg' : ''}`}
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
      ) : (
        <div className="text-gray-500 text-sm md:text-base">
          Opening hours will be updated soon.
        </div>
      )}
    </div>
  );
};

export default OpeningHours;
