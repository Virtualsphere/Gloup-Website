import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Arjun',
      role: 'Senior Stylist',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=150&h=150', // Replace with actual image path or placeholder
    },
    {
      id: 2,
      name: 'Ravi',
      role: 'Hairstylist',
      image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=150&h=150', // Replace with actual image path or placeholder
    },
    // Add more members as needed
  ];

  return (
    <div className="bg-white lg:bg-gray-100 px-5 lg:px-0 py-2">
      <div className="px-5 lg:px-0 mb-4 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900">Team</h2>
        <button className="text-gray-900 text-sm font-medium hover:text-gray-700">
          See All
        </button>
      </div>

      <div className="flex overflow-x-auto scrollbar-hide px-5 lg:px-0 gap-6 md:gap-8 lg:gap-10 pb-2">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex flex-col items-center flex-shrink-0 w-24">
            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-white shadow-sm mb-2 relative">
               <img 
                 src={member.image} 
                 alt={member.name}
                 className="w-full h-full object-cover"
               />
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-medium text-gray-900 text-center leading-tight">
              {member.name}
            </h3>
            <p className="text-sm md:text-base text-gray-500 text-center leading-tight mt-0.5">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
