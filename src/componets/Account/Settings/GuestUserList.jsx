import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';

const GuestUserList = ({ guests }) => {
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  const toggleActionMenu = (id) => {
    if (openActionMenuId === id) {
      setOpenActionMenuId(null);
    } else {
      setOpenActionMenuId(id);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {guests.map((guest) => (
        <div key={guest.id} className="w-full bg-white rounded-2xl p-4 flex items-center justify-between relative md:border md:border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] md:shadow-sm">
          <div>
            <h3 className="text-[16px] text-black mb-1 tracking-wide">{guest.name}</h3>
            <div className="flex items-center gap-2 text-[#3b82f6] text-sm">
              <span className="font-bold">
                {guest.gender === 'Female' ? '♀' : guest.gender === 'Male' ? '♂' : '⚥'}
              </span> {guest.gender}
            </div>
          </div>
          
          {/* 3 Dots Menu Button */}
          <button 
            onClick={() => toggleActionMenu(guest.id)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
          >
            <MoreVertical className="w-5 h-5 text-black" />
          </button>

          {/* Dropdown Menu */}
          {openActionMenuId === guest.id && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setOpenActionMenuId(null)}
              ></div>
              <div className="absolute right-4 top-14 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-2 w-32 z-20 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                <button className="w-full text-left px-5 py-3 text-[15px] hover:bg-gray-50 text-gray-800 transition-colors">
                  Edit
                </button>
                <button className="w-full text-left px-5 py-3 text-[15px] hover:bg-gray-50 text-gray-800 transition-colors">
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default GuestUserList;
