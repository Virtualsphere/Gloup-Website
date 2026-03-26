import React from 'react';
import BillingSummary from './BillingSummary';
import WalletToggle from './WalletToggle';
import CouponSection from './CouponSection';

const DeskPaymentCard = ({
  amount,
  discountedAmount,
  serviceDiscount,
  couponDiscount,
  appliedCoupon,
  onApplyCoupon,
  subtotal,
  gstAmount,

  platformFee,
  walletUsed,
  walletBalance,
  useWallet,
  onToggleWallet,
  finalAmount,
  totalBeforeWallet,
  onPay,
  isLoading,
  disabled,
  isProfileMissing,
}) => {
  return (
    <div className="sticky top-24 space-y-4">
      {/* Billing card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Billing rows */}
        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Amount</span>
            <span className="font-medium text-gray-900">₹{amount}</span>
          </div>

          {serviceDiscount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium text-red-500">-₹{serviceDiscount}</span>
            </div>
          )}

          {couponDiscount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-500 font-medium">Coupon ({appliedCoupon?.code})</span>
              <span className="font-medium text-green-500">-₹{couponDiscount}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">₹{subtotal}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>GST (5%)</span>
            <span className="font-medium text-gray-900">₹{gstAmount}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Platform Fee</span>
            <span className="flex items-center gap-2">
              <span className="text-gray-400 line-through">₹{platformFee}</span>
              <span className="font-medium text-green-500 flex items-center gap-1">
                <span className="text-xs"></span> Free
              </span>
            </span>
          </div>

          {walletUsed > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">GloUp Cash</span>
              <span className="font-medium text-green-500">-₹{walletUsed}</span>
            </div>
          )}

          <div className="border-t border-gray-100 pt-3 mt-2 flex items-center justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <div className="flex items-center gap-2">
              {walletUsed > 0 && (
                <span className="text-sm text-gray-400 line-through">₹{totalBeforeWallet}</span>
              )}
              <span className="text-xl font-bold text-gray-900">₹{finalAmount}</span>
            </div>
          </div>
        </div>

        {/* Wallet toggle */}
        <div className="border-t border-gray-100 px-5 py-3">
          {/* <WalletToggle
            balance={walletBalance}
            useWallet={useWallet}
            onToggle={onToggleWallet}
          /> */}
        </div>

        {/* Pay via Razorpay */}
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3">
            <div>
              <div className="text-[10px] text-gray-500 mb-0.5">Pay via</div>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  <div className="w-1.5 h-4 bg-blue-600 skew-x-[-15deg]"></div>
                  <div className="w-1.5 h-3 bg-blue-400 skew-x-[-15deg]"></div>
                </div>
                <span className="text-sm font-bold text-gray-800 tracking-tight">Razorpay</span>
              </div>
            </div>
            <button
              onClick={onPay}
              disabled={isLoading || disabled}
              className={`text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm text-sm flex items-center gap-2 ${
                isLoading || disabled || isProfileMissing
                  ? 'bg-gray-300 cursor-not-allowed shadow-none opacity-70'
                  : 'bg-green-500 hover:bg-green-600 shadow-green-200'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Processing…
                </>
              ) : (
                <>Pay ₹{finalAmount}</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Coupons & Offers */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4">
        <h3 className="text-base font-bold text-gray-900 mb-3">Coupons &amp; Offers</h3>
        <CouponSection amount={discountedAmount} appliedCoupon={appliedCoupon} onApplyCoupon={onApplyCoupon} />
      </div>
    </div>
  );
};

export default DeskPaymentCard;
