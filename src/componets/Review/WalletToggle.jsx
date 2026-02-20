import React from 'react';
import { Check } from 'lucide-react';

const WalletToggle = ({ balance, useWallet, onToggle }) => {
  return (
    <div 
      onClick={onToggle}
      className="flex items-center gap-3 cursor-pointer select-none py-2"
    >
      {/* Checkbox */}
      <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
        useWallet ? 'bg-black' : 'border-2 border-gray-300'
      }`}>
        {useWallet && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
      </div>
      
      <div className="font-semibold text-gray-900 text-sm">
        Use Gloup Cash <span className="text-green-500">₹{balance}</span>
      </div>
    </div>
  );
};

export default WalletToggle;
