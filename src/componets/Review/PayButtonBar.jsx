import React from 'react';

const PayButtonBar = ({ amount, onPay, isLoading }) => {
  return (
    <div className="bg-white border-t border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Side: Payment Method info */}
        <div className="flex flex-col">
            <div className="text-[10px] text-gray-500 mb-0.5">Pay via</div>
            <div className="flex items-center gap-1.5 grayscale opacity-80">
                {/* Simple Razorpay logo representation */}
                <div className="flex">
                    <div className="w-1.5 h-4 bg-blue-600 skew-x-[-15deg]"></div>
                    <div className="w-1.5 h-3 bg-blue-400 skew-x-[-15deg]"></div>
                </div>
                <span className="text-sm font-bold text-gray-800 tracking-tight">Razorpay</span>
            </div>
        </div>

        {/* Right Side: Pay Button */}
        <button
          onClick={onPay}
          disabled={isLoading}
          className="bg-green-500 text-white font-bold py-3 px-8 rounded-xl min-w-[140px] hover:bg-green-600 transition-colors shadow-sm shadow-green-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Processing…
            </>
          ) : (
            <>Pay ₹{amount}</>
          )}
        </button>
      </div>

      {/* Safe area spacing for mobile home indicator */}
      <div className="h-2 w-1/3 bg-gray-300 rounded-full mx-auto mt-3"></div>
    </div>
  );
};

export default PayButtonBar;
