import React, { useState } from 'react';
import { User, Users } from 'lucide-react';
import UserProfileCard from './UserProfileCard';
import AddPersonModal from './AddPersonModal';

const BookingForSection = () => {
    // State for toggle: 'self' | 'other'
    const [bookingFor, setBookingFor] = useState('self');
    
    // State for modal
    const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);
    
    // Initial profiles state
    const [otherProfiles, setOtherProfiles] = useState([
        { id: 1, name: 'Priya Sharma', details: '26 Yrs • Female', isSelected: false },
        { id: 2, name: 'Rahul Verma', details: '30 Yrs • Male', isSelected: false },
    ]);

    // Active profile state
    const [selectedProfileId, setSelectedProfileId] = useState(null);

    // Editing person state
    const [editingPerson, setEditingPerson] = useState(null);

    const handleSavePerson = (personData) => {
        if (editingPerson) {
            // Update existing
            const updatedProfiles = otherProfiles.map(p => 
                p.id === editingPerson.id 
                ? { ...p, name: personData.fullName, details: `${personData.age} Yrs • ${personData.gender}`, phone: personData.phone }
                : p
            );
            setOtherProfiles(updatedProfiles);
            setEditingPerson(null);
        } else {
            // Add new
            const newProfile = {
                id: Date.now(),
                name: personData.fullName,
                details: `${personData.age} Yrs • ${personData.gender}`,
                phone: personData.phone,
                isSelected: true
            };
            setOtherProfiles([...otherProfiles, newProfile]);
            setSelectedProfileId(newProfile.id);
        }
    };

    return (
        <div className="mt-8 px-1">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Who is this booking for?</h2>
            
            {/* Toggle Buttons */}
            <div className="flex gap-4 mb-6">
                <button 
                    onClick={() => setBookingFor('self')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors border ${
                        bookingFor === 'self' 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <User className="w-4 h-4" />
                    Myself
                </button>
                <button 
                    onClick={() => setBookingFor('other')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors border ${
                        bookingFor === 'other' 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <Users className="w-4 h-4" />
                    Someone else
                </button>
            </div>

            {/* Content Area */}
            <div className="space-y-3">
                {bookingFor === 'self' ? (
                    <UserProfileCard 
                        name="John Doe" 
                        details="28 Yrs • Male" 
                        isSelected={true}
                        onEdit={() => console.log('Edit self')}
                        onSelect={() => {}}
                    />
                ) : (
                    <>
                        {otherProfiles.map(profile => (
                            <UserProfileCard 
                                key={profile.id}
                                name={profile.name}
                                details={profile.details}
                                isSelected={selectedProfileId === profile.id}
                                onEdit={() => {
                                    setEditingPerson(profile);
                                    setIsAddPersonModalOpen(true);
                                }}
                                onSelect={() => setSelectedProfileId(profile.id)}
                            />
                        ))}
                        <UserProfileCard 
                            type="add-new" 
                            onSelect={() => {
                                setEditingPerson(null);
                                setIsAddPersonModalOpen(true);
                            }}
                        />
                    </>
                )}
            </div>

            {/* Add Person Modal */}
            <AddPersonModal 
                isOpen={isAddPersonModalOpen}
                onClose={() => {
                    setIsAddPersonModalOpen(false);
                    setEditingPerson(null);
                }}
                onSave={handleSavePerson}
                initialData={editingPerson}
            />
        </div>
    );
};

export default BookingForSection;
