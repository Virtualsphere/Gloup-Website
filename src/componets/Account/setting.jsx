import React, { useState } from 'react';
import { ChevronLeft, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeleteAccountModal from './Settings/DeleteAccountModal';
import AddGuestModal from './Settings/AddGuestModal';
import GuestUserList from './Settings/GuestUserList';

export default function Settings() {
  const navigate = useNavigate();

  // State for modals
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);

  // Mock guest user data
  const [guestUsers, setGuestUsers] = useState([
    { id: 1, name: 'Akash', gender: 'Male' }
  ]);

  const handleAddGuest = (e) => {
    e.preventDefault();
    // Logic to add guest would go here (e.g. calling an API)
    setShowAddGuestModal(false);
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen md:min-h-full flex flex-col relative pb-20 md:pb-0 md:rounded-3xl md:overflow-hidden md:bg-white md:shadow-sm font-sans">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-[#F5F5F5] md:bg-white md:border-b border-b border-gray-200 md:px-6 md:py-5">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ChevronLeft className="w-6 h-6 text-black" strokeWidth={2.5} />
        </button>
        <h1 className="text-[19px] md:text-xl font-semibold text-black">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto w-full max-w-md sm:max-w-full md:max-w-3xl lg:max-w-4xl mx-auto md:px-8">
        <div className="px-5 sm:px-10 py-6 md:py-8 flex flex-col gap-4">
          
          {/* Top Profile Banner Placeholder */}
          <div className="w-full bg-white rounded-2xl p-4 flex items-center md:border md:border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] md:shadow-sm h-28">
            <div className="w-[60px] h-[60px] bg-gray-100 rounded-full flex items-center justify-center mr-4">
               {/* Image placeholder icon equivalent to mock */}
               <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center relative overflow-hidden">
                 <div className="absolute bottom-0 w-full h-1/2 flex items-end justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-gray-400 -mr-1"></div>
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-gray-400"></div>
                 </div>
                 <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
               </div>
            </div>
            {/* Couple icon placeholder */}
            <div className="flex gap-0.5 text-[#3b82f6]">
               <div className="font-bold text-lg">🧍</div>
               <div className="font-bold text-lg">🧍‍♀️</div>
            </div>
          </div>

          {/* Delete Account Button */}
          <button 
            onClick={() => setShowDeleteAccountModal(true)}
            className="w-full bg-white rounded-2xl p-5 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors md:border md:border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] md:shadow-sm"
          >
            <Trash2 className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
            <span className="text-[16px] text-black tracking-wide">Delete Account</span>
          </button>

          {/* Guest User Header */}
          <div className="flex items-center justify-between mt-4 mb-1">
            <h2 className="text-[18px] text-gray-800 tracking-wide">Guest User</h2>
            <button 
              onClick={() => setShowAddGuestModal(true)}
              className="bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-gray-900 transition-colors"
            >
              <Plus className="w-4 h-4" strokeWidth={3} /> Add
            </button>
          </div>

          {/* Guest User List Component */}
          <GuestUserList guests={guestUsers} />

        </div>
      </div>

      {/* MODALS */}
      <DeleteAccountModal 
        isOpen={showDeleteAccountModal} 
        onClose={() => setShowDeleteAccountModal(false)} 
      />

      <AddGuestModal 
        isOpen={showAddGuestModal} 
        onClose={() => setShowAddGuestModal(false)} 
        onAddGuest={handleAddGuest} 
      />

    </div>
  );
}
