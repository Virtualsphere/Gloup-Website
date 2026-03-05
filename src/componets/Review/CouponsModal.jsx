import React from 'react';
import { X, Tag } from 'lucide-react';
import { useGetCoupon } from '../../hooks/services/useGetCoupon';

const CouponsModal = ({ isOpen, onClose, onApply, appliedCoupon }) => {
  const { data: couponsData, isLoading, isError } = useGetCoupon();
  
  if (!isOpen) return null;

  const activeCoupons = couponsData?.data || [];

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
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading coupons...</div>
          ) : isError || activeCoupons.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No active coupons available at this time.</div>
          ) : (
            activeCoupons.map((coupon) => (
              <div key={coupon.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Save on this booking
                    </div>
                    <div className="text-green-500 font-bold text-sm mt-0.5 uppercase">
                      "{coupon.code}"
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => onApply({ code: coupon.code, savings: 50 })}
                  className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors shadow-sm ${
                      appliedCoupon?.code === coupon.code
                      ? 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      : 'bg-green-500 text-white hover:bg-green-600 shadow-green-200'
                  }`}
                >
                  {appliedCoupon?.code === coupon.code ? 'Applied' : 'Apply'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponsModal;
