import React from 'react';
import { Pencil, Check, Plus } from 'lucide-react';

const UserProfileCard = ({ name, details, isSelected, onEdit, onSelect, type = 'default' }) => {
  if (type === 'add-new') {
    return (
      <div 
        onClick={onSelect}
        className="w-full bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 cursor-pointer hover:border-gray-300 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Plus className="w-5 h-5 text-gray-900" />
        </div>
        <span className="font-semibold text-gray-900 text-sm">Add a New Person</span>
      </div>
    );
  }

  return (
    <div 
      onClick={onSelect}
      className={`w-full bg-white rounded-xl border p-4 flex items-center justify-between cursor-pointer transition-all ${
        isSelected ? 'border-black shadow-sm' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900 text-sm">{name}</span>
        <span className="text-xs text-gray-500 mt-1">{details}</span>
      </div>
      
      <div className="flex items-center gap-3">
        {onEdit && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Pencil className="w-3 h-3 text-gray-500" />
          </button>
        )}
        
        {isSelected && (
          <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
