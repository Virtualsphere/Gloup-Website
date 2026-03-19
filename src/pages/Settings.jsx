import React, { useState } from 'react';
import { ChevronLeft, Trash2, Plus, Users, User, X, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddPersonModal from '../componets/Review/AddPersonModal';
import { useGetAllGuest } from '../hooks/services/useGetAllGuest';

const Settings = () => {
  const navigate = useNavigate();
  
  const { data: guestsResponse, isLoading, refetch } = useGetAllGuest();
  const guests = guestsResponse?.data || [];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);
  const [guestToDelete, setGuestToDelete] = useState(null);

  const handleAddGuest = () => {
    setEditingGuest(null);
    setIsModalOpen(true);
  };

  const handleEditGuest = (guest) => {
    setEditingGuest(guest);
    setIsModalOpen(true);
  };

  const handleSavePerson = (personData) => {
    // Integrate with Add/Edit API here in the future
    // Currently relying on BookingForSection logic if needed, or simply closing the modal
    console.log("Saved person:", personData);
    setIsModalOpen(false);
    refetch(); // if backend is connected
  };

  const confirmDelete = () => {
    console.log("Deleted guest:", guestToDelete);
    // integrate with Delete Guest API here
    setGuestToDelete(null);
    refetch(); // if backend is connected
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-8 lg:hidden relative">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 bg-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 hover:bg-gray-200 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="px-4">
        {/* User Card */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 mb-4 shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
             <User className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">John Doe</h2>
            <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold mt-1">
              <Users className="w-4 h-4" />
              <span>Female</span>
            </div>
          </div>
        </div>

        {/* Delete Account */}
        <button className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 mb-8 shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
          <Trash2 className="w-6 h-6 text-gray-600 font-light" />
          <span className="text-gray-800 text-lg font-medium">Delete Account</span>
        </button>

        {/* Guest User Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Guest User</h2>
          <button 
            onClick={handleAddGuest}
            className="flex items-center gap-1 bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {/* Guest List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="p-4 bg-white rounded-2xl border border-gray-100 animate-pulse text-gray-400 text-sm">
                Loading guests...
            </div>
          ) : guests.length === 0 ? (
             <div className="p-4 bg-white rounded-2xl border border-gray-100 text-gray-500 text-sm text-center">
                No guest users.
            </div>
          ) : (
            guests.map((guest, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100">
                <div 
                  className="flex-1 cursor-pointer flex items-center gap-4" 
                  onClick={() => handleEditGuest(guest)}
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{guest.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold mt-1">
                      <Users className="w-4 h-4" />
                      <span>{guest.gender}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setGuestToDelete(guest);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                >
                  <MoreVertical className="w-6 h-6" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Reusing existing AddPersonModal for Add/Edit */}
      <AddPersonModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePerson}
        initialData={editingGuest ? {
          name: editingGuest.name,
          details: `${editingGuest.age} Yrs • ${editingGuest.gender}`,
          phone: editingGuest.phone
        } : null}
      />

      {/* Delete Guest Confirmation Modal */}
      {guestToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setGuestToDelete(null)} />
              <div className="relative bg-white rounded-3xl p-6 shadow-xl w-full max-w-sm animate-scale-up">
                  <h3 className="text-lg font-bold text-center text-gray-900 mb-6">Are You Sure want to delete this guest user?</h3>
                  <div className="flex gap-4">
                      <button 
                         onClick={() => setGuestToDelete(null)}
                         className="flex-1 py-4 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                      >
                         Not Now
                      </button>
                      <button 
                         onClick={confirmDelete}
                         className="flex-1 py-4 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition-colors"
                      >
                         Submit
                      </button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default Settings;
