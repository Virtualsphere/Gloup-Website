import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CompleteProfileModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    gender: 'Male',
  });

  useEffect(() => {
    if (isOpen) {
        if (initialData) {
            setFormData({
                firstname: initialData.firstname || '',
                lastname: initialData.lastname || '',
                email: initialData.email || '',
                dob: initialData.dob || '',
                gender: initialData.gender || 'Male',
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
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />

      <div className="relative w-full md:max-w-md bg-white rounded-t-3xl md:rounded-3xl p-6 shadow-xl animate-slide-up md:animate-none max-h-[90vh] overflow-y-auto">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6 md:hidden" />

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Complete Profile</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1.5">First name</label>
            <input type="text" value={formData.firstname} onChange={(e) => setFormData({...formData, firstname: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors placeholder:text-gray-400 font-medium text-gray-900" placeholder="Enter first name" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1.5">Last name</label>
            <input type="text" value={formData.lastname} onChange={(e) => setFormData({...formData, lastname: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors placeholder:text-gray-400 font-medium text-gray-900" placeholder="Enter last name" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1.5">Email ID</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors placeholder:text-gray-400 font-medium text-gray-900" placeholder="Enter email" required />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-500 mb-1.5">Date of Birth</label>
             <input type="text" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} placeholder="Date of Birth (YYYY-MM-DD)" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors placeholder:text-gray-400 font-medium text-gray-900" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1.5">Gender</label>
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

          <button type="submit" className="w-full bg-black text-white font-semibold py-4 rounded-xl mt-4 hover:bg-gray-900 transition-colors">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfileModal;
