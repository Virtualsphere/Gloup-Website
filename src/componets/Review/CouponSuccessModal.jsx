import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const CouponSuccessModal = ({ isOpen, onClose, savings, couponCode }) => {
  useEffect(() => {
    if (isOpen) {
      // Basic confetti burst
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 200 // Higher than modal backdrop
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl transform transition-all scale-100 animate-pop-in text-center">
        
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 text-white stroke-[3]" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-1">Coupon Applied</h2>
        <p className="text-gray-500 text-sm mb-6">
          "<span className="text-green-500 font-semibold">{couponCode}</span>" applied successfully
        </p>

        {/* Savings Card */}
        <div className="bg-green-50 rounded-2xl p-6 mb-6">
          <div className="text-3xl font-bold text-green-500 mb-1">
            ₹{savings}
          </div>
          <div className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Saved on this booking
          </div>
        </div>

        {/* Close Action */}
        <button 
          onClick={onClose}
          className="text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors"
        >
          Tap to continue
        </button>
      </div>
    </div>
  );
};

export default CouponSuccessModal;
