import React from 'react';
import { X, Tag } from 'lucide-react';
import { useGetCoupon } from '../../hooks/services/useGetCoupon';

const CouponsModal = ({ isOpen, onClose, onApply, appliedCoupon, amount = 0 }) => {
  const { data: couponsData, isLoading, isError } = useGetCoupon();

  if (!isOpen) return null;

  const activeCoupons = couponsData?.data || [];

  const getCouponDetails = (coupon) => {
    let extractedAmount = 0;
    let requiredAmount = 0;
    let pendingAmount = 0;
    let isValid = false;

    if (coupon.discountType === 'flat') {
        extractedAmount = Number(coupon.discountValue);
        requiredAmount = extractedAmount + 30;
        isValid = amount >= requiredAmount;
        pendingAmount = isValid ? 0 : requiredAmount - amount;
    } else if (coupon.discountType === 'percentage') {
        extractedAmount = Math.round((amount * Number(coupon.discountValue)) / 100);
        isValid = true;
        pendingAmount = 0;
    } else {
        const match = coupon.code?.match(/\d+/);
        extractedAmount = match ? parseInt(match[0], 10) : 0;
        requiredAmount = extractedAmount + 30;
        isValid = amount >= requiredAmount;
        pendingAmount = isValid ? 0 : requiredAmount - amount;
    }

    return { extractedAmount, isValid, pendingAmount };
  };

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
            activeCoupons.map((coupon) => {
              const { extractedAmount, isValid, pendingAmount } = getCouponDetails(coupon);
              return (
                <div key={coupon.id} className={`flex flex-col bg-white border ${isValid ? 'border-gray-100' : 'border-gray-200 opacity-60 bg-gray-50'} rounded-2xl shadow-sm overflow-hidden`}>
                  <div className="flex items-center justify-between p-4 gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isValid ? 'bg-green-50 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                        <Tag className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className={`font-semibold text-sm whitespace-nowrap truncate ${isValid ? 'text-gray-900' : 'text-gray-400'}`}>
                          Save on this booking
                        </div>
                        <div className={`font-bold text-sm mt-0.5 uppercase truncate ${isValid ? 'text-green-500' : 'text-gray-400'}`}>
                          "{coupon.code}"
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                          if (isValid) onApply(coupon, extractedAmount);
                      }}
                      disabled={!isValid}
                      className={`flex-shrink-0 px-6 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                        !isValid
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                          : appliedCoupon?.code === coupon.code
                          ? 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                          : 'bg-green-500 text-white hover:bg-green-600 shadow-sm shadow-green-200'
                      }`}
                    >
                      {appliedCoupon?.code === coupon.code ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                  {!isValid && (
                      <div className="bg-[#FFF8E7] px-4 py-2 flex items-center gap-2 text-[#EBBB6C] text-xs font-medium border-t border-gray-100">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                          Add services worth ₹{pendingAmount} more to avail this coupon
                      </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponsModal;
