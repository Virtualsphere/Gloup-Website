import React from 'react';
import BillingRow from './BillingRow';

const BillingSummary = ({
  amount,
  couponDiscount,
  couponCode,
  subtotal,
  gstAmount,
  isPlatformFree,
  platformFee, // original fee before free
  walletUsed,
  finalAmount,
  totalBeforeWallet // For showing crossed out total if needed, or just standard total
}) => {
  return (
    <div className="mt-6 px-1">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Billing Summary</h2>
      
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
        <BillingRow 
          label="Amount" 
          value={`₹${amount}`} 
        />
        
        {couponDiscount > 0 && (
          <BillingRow 
            label={`Coupon (${couponCode})`} 
            value={`-₹${couponDiscount}`} 
            variant="discount" 
          />
        )}

        <div className="my-3 border-t border-gray-100" />

        <BillingRow 
          label="Subtotal" 
          value={`₹${subtotal}`} 
        />
        
        <BillingRow 
          label="GST (5.0%)" 
          value={`₹${gstAmount}`} 
        />

        <BillingRow 
          label="Platform fee" 
          value="FREE" 
          variant="free"
          crossedValue={platformFee}
        />

        {walletUsed > 0 && (
          <BillingRow 
            label="Gloup Cash" 
            value={`-₹${walletUsed}`} 
            variant="discount" 
          />
        )}

        <BillingRow 
          label="Total" 
          value={`₹${finalAmount}`} 
          variant="total"
          crossedValue={walletUsed > 0 ? totalBeforeWallet : null}
        />
      </div>
    </div>
  );
};

export default BillingSummary;
