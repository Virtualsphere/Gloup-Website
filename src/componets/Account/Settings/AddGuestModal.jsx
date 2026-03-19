import React from 'react';
import { X } from 'lucide-react';

const AddGuestModal = ({ isOpen, onClose, onAddGuest }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-white w-full md:max-w-md rounded-t-[32px] md:rounded-[24px] p-6 pb-8 md:pb-6 shadow-2xl relative animate-in slide-in-from-bottom-full md:slide-in-from-bottom-10 md:zoom-in-95 duration-300">
        
        {/* Mobile Drag Handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6 md:hidden"></div>

        {/* Desktop Close Button */}
        <button 
          onClick={onClose}
          className="hidden md:flex absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <h3 className="text-[20px] font-bold text-black mb-6">Add a new person</h3>

        <form onSubmit={onAddGuest} className="flex flex-col gap-4">
          
          {/* Full Name */}
          <div>
            <label className="text-gray-500 text-[13px] mb-1.5 block px-1">Full name</label>
            <input 
              type="text" 
              placeholder="Enter full name" 
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 text-[15px]" 
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="text-gray-500 text-[13px] mb-1.5 block px-1">Age</label>
            <input 
              type="number" 
              placeholder="Enter age" 
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 text-[15px]" 
              required
            />
          </div>

          {/* Gender (Radio Buttons styled as pills) */}
          <div>
            <label className="text-gray-500 text-[13px] mb-1.5 block px-1">Gender</label>
            <div className="flex items-center gap-3">
              <button type="button" className="flex-1 py-3 border-2 border-black rounded-[12px] bg-white text-black font-semibold text-[15px]">
                Male
              </button>
              <button type="button" className="flex-1 py-3 border border-gray-200 rounded-[12px] bg-white text-gray-400 hover:border-gray-300 transition-colors text-[15px]">
                Female
              </button>
              <button type="button" className="flex-1 py-3 border border-gray-200 rounded-[12px] bg-white text-gray-400 hover:border-gray-300 transition-colors text-[15px]">
                Other
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className="mb-2">
            <label className="text-gray-500 text-[13px] mb-1.5 block px-1">Phone (optional)</label>
            <div className="flex items-center w-full h-14 bg-white border border-gray-200 rounded-[12px] focus-within:border-gray-400 transition-colors p-1.5">
               <div className="h-full bg-[#F5F5F5] rounded-[8px] px-3 flex items-center justify-center font-medium text-black">
                 +91
               </div>
               <input 
                 type="tel"
                 placeholder="Phone number" 
                 className="flex-1 h-full px-3 bg-transparent border-none focus:outline-none placeholder:text-gray-400 text-[15px]"
               />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full mt-2 bg-black text-white py-4 rounded-[12px] font-semibold text-[16px] hover:bg-gray-900 transition-colors"
          >
            Add a person
          </button>

        </form>
      </div>

    </div>
  );
};

export default AddGuestModal;
