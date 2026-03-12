import React from 'react';

const BASE_IMAGE_URL = import.meta.env.VITE_PROFILE_IMG_URL;

const Team = ({ teamMembers = [] }) => {

  return (
    <div className="bg-white lg:bg-gray-100 lg:px-0 py-2">
      <div className="px-5 lg:px-0 mb-4 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900">Team</h2>
        <button className="text-gray-900 text-sm font-medium hover:text-gray-700">
          See All
        </button>
      </div>

      {teamMembers && teamMembers.length > 0 ? (
        <div className="flex overflow-x-auto scrollbar-hide px-5 lg:px-0 gap-6 md:gap-8 lg:gap-10 pb-2">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center flex-shrink-0 w-24">
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-white shadow-sm mb-2 relative">
                 <img 
                   src={member.imageUrl ? (member.imageUrl.startsWith('/') ? `${BASE_IMAGE_URL}${member.imageUrl}` : `${BASE_IMAGE_URL}/${member.imageUrl}`) : `https://ui-avatars.com/api/?name=${member.name}`} 
                   alt={member.name}
                   className="w-full h-full object-cover"
                 />
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 text-center leading-tight truncate w-full px-1">
                {member.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 text-center leading-tight mt-0.5 truncate w-full px-1">
                {member.role || 'Member'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 lg:px-0 py-4 text-gray-500 text-sm md:text-base">
          No team members available at the moment.
        </div>
      )}
    </div>
  );
};

export default Team;
