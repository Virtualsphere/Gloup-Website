import React from 'react';
import { X, Tag } from 'lucide-react';

const coupons = [
  { id: 1, code: 'GLOUP2026', savings: 50, color: 'green' },
  { id: 2, code: 'SAVE100', savings: 100, color: 'blue' },
  { id: 3, code: 'WELCOME75', savings: 75, color: 'purple' },
  { id: 4, code: 'MEGA150', savings: 150, color: 'orange' }
];

const CouponsModal = ({ isOpen, onClose, onApply, appliedCoupon }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-xl animate-slide-up sm:animate-none max-h-[85vh] flex flex-col">
        {/* Drag handle for mobile */}
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden flex-shrink-0" />

        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Available Coupons</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto py-4 space-y-4">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Save ₹{coupon.savings} with
                  </div>
                  <div className="text-green-500 font-bold text-sm mt-0.5">
                    "{coupon.code}"
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onApply(coupon)}
                className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors shadow-sm ${
                    appliedCoupon?.code === coupon.code
                    ? 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    : 'bg-green-500 text-white hover:bg-green-600 shadow-green-200'
                }`}
              >
                {appliedCoupon?.code === coupon.code ? 'Applied' : 'Apply'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponsModal;
