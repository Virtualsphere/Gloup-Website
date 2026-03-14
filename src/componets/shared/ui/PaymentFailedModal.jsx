import React from 'react';
import { X } from 'lucide-react';

const PaymentFailedModal = ({ isOpen, onClose, onTryAgain, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-[32px] w-full max-w-[360px] p-8 shadow-xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center relative"
        role="dialog"
      >
        {/* Error Icon Circle */}
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5 relative">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-md shadow-red-200">
            <X className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title & Message */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Failed</h2>
        <p className="text-gray-500 text-sm mb-6 max-w-[200px]">
          {errorMessage || 'Something went wrong.'}
        </p>

        {/* Assurance Box */}
        <div className="bg-red-50/50 border border-red-50 rounded-2xl p-4 w-full mb-6">
          <h3 className="text-red-500 font-semibold mb-1">Don't worry!</h3>
          <p className="text-red-400/80 text-sm leading-snug">
            No amount has been deducted from your account
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onTryAgain}
          className="w-full bg-[#ef4444] hover:bg-red-600 text-white font-semibold py-4 rounded-2xl transition-colors mb-4 shadow-sm"
        >
          Try Again
        </button>

        {/* Dismiss Text */}
        <button 
          onClick={onClose}
          className="text-gray-400 text-xs hover:text-gray-600 transition-colors"
        >
          Tap anywhere to dismiss
        </button>

        {/* Click-away overlay handler (invisible layer behind the card but in front of backdrop) */}
        <div className="absolute inset-0 -z-10" onClick={onClose} />
      </div>
      
      {/* Fallback backdrop click handler */}
      <div className="absolute inset-0 -z-20" onClick={onClose} />
    </div>
  );
};

export default PaymentFailedModal;
