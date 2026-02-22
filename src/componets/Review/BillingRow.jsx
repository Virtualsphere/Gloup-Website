import React from 'react';

const BillingRow = ({ label, value, variant = 'normal', crossedValue }) => {
  const isDiscount = variant === 'discount';
  const isFree = variant === 'free';
  const isTotal = variant === 'total';

  let valueColor = 'text-gray-900';
  if (isDiscount || isFree) valueColor = 'text-green-500 font-medium';
  
  let labelColor = 'text-gray-600';
  if (isDiscount || isFree) labelColor = 'text-green-500';
  if (isTotal) labelColor = 'text-gray-900 font-bold';

  return (
    <div className={`flex justify-between items-center py-2.5 ${isTotal ? 'text-lg lg:text-xl mt-2 pt-4 border-t border-gray-100' : 'text-sm lg:text-base'}`}>
      <span className={labelColor}>{label}</span>
      <div className="flex items-center gap-2">
        {crossedValue && (
          <span className="text-gray-400 line-through text-sm">₹{crossedValue}</span>
        )}
        <span className={`${valueColor} ${isTotal ? 'font-bold' : ''}`}>
          {isFree ? 'FREE' : value}
        </span>
      </div>
    </div>
  );
};

export default BillingRow;
