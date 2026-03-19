import React from 'react';

const DeleteAccountModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] w-full max-w-[340px] p-6 shadow-xl animate-in zoom-in-95 duration-200">
        <h3 className="text-center text-[16px] text-black mb-6 mt-2 tracking-wide">
          Are You Sure want to Delete Account
        </h3>
        
        {/* Divider */}
        <div className="h-[1px] bg-gray-100 w-full mb-6 mx-auto scale-110"></div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 bg-white border border-gray-200 rounded-xl text-black font-medium text-[15px] hover:bg-gray-50 transition-colors focus:outline-none"
          >
            Not Now
          </button>
          <button className="flex-1 py-3.5 bg-[#B3B3B3] rounded-xl text-black font-medium text-[15px] hover:bg-gray-400 transition-colors focus:outline-none">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
