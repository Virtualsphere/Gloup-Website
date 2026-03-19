import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddPersonModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: 'Male',
    phone: ''
  });

  useEffect(() => {
    if (isOpen) {
        if (initialData) {
            setFormData({
                fullName: initialData.name || '',
                age: initialData.age || '', 
                gender: initialData.gender || 'Male',
                phone: initialData.phone || ''
            });
        } else {
            // Reset for add new
            setFormData({
                fullName: '',
                age: '',
                gender: 'Male',
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
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full md:max-w-md bg-white rounded-t-3xl md:rounded-3xl p-6 shadow-xl animate-slide-up md:animate-none">
        {/* Drag handle for mobile */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6 md:hidden" />

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">{initialData ? 'Edit profile' : 'Add a new person'}</h2>
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors placeholder:text-gray-400 font-medium text-gray-900"
              placeholder="Enter full name"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors placeholder:text-gray-400 font-medium text-gray-900"
              placeholder="Enter age"
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
                      : 'border-gray-200 text-gray-400 hover:border-gray-300 bg-white'
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
              <div className="px-4 py-3 rounded-xl bg-gray-100/50 flex items-center justify-center text-gray-900 font-bold border border-gray-200">
                +91
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors placeholder:text-gray-400 font-medium text-gray-900"
                placeholder="Phone number"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-4 rounded-xl mt-4 hover:bg-gray-900 transition-colors"
          >
            {initialData ? 'Save changes' : 'Add a person'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPersonModal;
