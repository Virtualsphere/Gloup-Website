import React from 'react';
import { Check } from 'lucide-react';

const PaymentSuccessModal = ({ isOpen, onClose, onContinue, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-[32px] w-full max-w-[360px] p-8 shadow-xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center relative"
        role="dialog"
      >
        {/* Success Icon Circle */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-5 relative">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-md shadow-green-200">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title & Message */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-500 text-sm mb-6 max-w-[200px]">
          {message || 'Your booking has been confirmed.'}
        </p>

        {/* Assurance Box */}
        <div className="bg-green-50/50 border border-green-50 rounded-2xl p-4 w-full mb-6">
          <h3 className="text-green-600 font-semibold mb-1">All set!</h3>
          <p className="text-green-500/90 text-sm leading-snug">
            We've sent the booking details to your registered email & phone.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onContinue}
          className="w-full bg-[#10b981] hover:bg-green-600 text-white font-semibold py-4 rounded-2xl transition-colors mb-4 shadow-sm"
        >
          View Bookings
        </button>

        {/* Dismiss Text */}
        <button 
          onClick={onClose}
          className="text-gray-400 text-xs hover:text-gray-600 transition-colors"
        >
          Tap anywhere to dismiss
        </button>

        {/* Click-away overlay handler */}
        <div className="absolute inset-0 -z-10" onClick={onClose} />
      </div>
      
      {/* Fallback backdrop click handler */}
      <div className="absolute inset-0 -z-20" onClick={onClose} />
    </div>
  );
};

export default PaymentSuccessModal;
