import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddPersonModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: 'Female',
    phone: ''
  });

  useEffect(() => {
    if (isOpen) {
        if (initialData) {
            setFormData({
                fullName: initialData.name || '',
                age: initialData.details.split(' ')[0] || '', // Extract age from details string for now
                gender: initialData.details.split(' • ')[1] || 'Female',
                phone: initialData.phone || ''
            });
        } else {
            // Reset for add new
            setFormData({
                fullName: '',
                age: '',
                gender: 'Female',
                phone: ''
            });
        }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-xl animate-slide-up sm:animate-none">
        {/* Drag handle for mobile */}
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">{initialData ? 'Edit profile' : 'Add new person'}</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1.5">
              Full name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors"
              placeholder="Priya Sharma"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1.5">
              Age
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors"
              placeholder="26"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1.5">
              Gender
            </label>
            <div className="flex gap-3">
              {['Male', 'Female', 'Other'].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setFormData({...formData, gender})}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-colors ${
                    formData.gender === gender
                      ? 'border-black bg-white text-black ring-1 ring-black'
                      : 'border-gray-200 text-gray-400 hover:border-gray-300'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1.5">
              Phone number (optional)
            </label>
            <div className="flex gap-3">
              <div className="px-4 py-3 rounded-xl bg-gray-50 text-gray-900 font-medium">
                +91
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors"
                placeholder="Phone number"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-4 rounded-xl mt-4 hover:bg-gray-900 transition-colors"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPersonModal;
