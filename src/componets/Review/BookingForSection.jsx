import React, { useState } from 'react';
import { User, Users } from 'lucide-react';
import UserProfileCard from './UserProfileCard';
import AddPersonModal from './AddPersonModal';
import { useGetAllGuest } from '../../hooks/services/useGetAllGuest';
import { useAddGuest } from '../../hooks/services/useAddGuest';
import { toast } from 'react-hot-toast';

const BookingForSection = () => {
    // --- State ---
    const [bookingFor, setBookingFor] = useState('self');
    const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);
    const [selectedProfileId, setSelectedProfileId] = useState(null);
    const [editingPerson, setEditingPerson] = useState(null);

    // --- API Hooks ---
    const { data: guestsResponse, isLoading, refetch } = useGetAllGuest();
    const addGuestMutation = useAddGuest();

    const otherProfiles = guestsResponse?.data || [];

    // --- Handlers ---
    const handleSavePerson = (personData) => {
        const payload = {
            name: personData.fullName,
            gender: personData.gender,
            age: Number(personData.age),
            phone: personData.phone
        };

        if (editingPerson) {
            console.warn("Update guest functionality not yet linked to API");
            toast('Edit guest is under construction.', { icon: '🚧' });
            setEditingPerson(null);
            setIsAddPersonModalOpen(false);
            return;
        }

        const loadingToastId = toast.loading('Adding guest...');
        addGuestMutation.mutate(payload, {
            onSuccess: () => {
                toast.success('Guest added successfully', { id: loadingToastId });
                refetch();
                setIsAddPersonModalOpen(false);
            },
            onError: (error) => {
                toast.error('Failed to add guest', { id: loadingToastId });
                console.error("Add guest error:", error);
            }
        });
    };

    const handleEditProfile = (profile) => {
        toast('Edit guest is under construction.', { icon: '🚧' });
        // setEditingPerson(profile);
        // setIsAddPersonModalOpen(true);
    };

    const openAddNewModal = () => {
        setEditingPerson(null);
        setIsAddPersonModalOpen(true);
    };

    // --- Render Helpers ---
    const renderToggleButton = (type, icon, label) => {
        const isActive = bookingFor === type;
        return (
            <button 
                onClick={() => setBookingFor(type)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm lg:text-base font-semibold transition-colors border ${
                    isActive 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
            >
                {icon}
                {label}
            </button>
        );
    };

    const renderSelfProfile = () => (
        <UserProfileCard 
            name="John Doe" 
            details="28 Yrs • Male" 
            isSelected={true}
            onEdit={() => console.log('Edit self')}
            onSelect={() => {}}
        />
    );

    const renderOtherProfiles = () => {
        if (isLoading) {
            return (
                <div className="p-4 border border-gray-100 rounded-2xl h-24 animate-pulse bg-gray-50 flex items-center justify-center">
                    <span className="text-gray-400 font-medium">Loading guests...</span>
                </div>
            );
        }

        return (
            <>
                {otherProfiles.map((profile, index) => (
                    <UserProfileCard 
                        key={index}
                        name={profile.name}
                        details={`${profile.age || ''} Yrs • ${profile.gender || 'Not specified'}`}
                        isSelected={selectedProfileId === index}
                        onEdit={() => handleEditProfile(profile)}
                        onSelect={() => setSelectedProfileId(index)}
                    />
                ))}
                <UserProfileCard type="add-new" onSelect={openAddNewModal} />
            </>
        );
    };

    // --- Main Render ---
    return (
        <div className="mt-8 px-1">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-4">Who is this booking for?</h2>
            
            <div className="flex gap-4 mb-6">
                {renderToggleButton('self', <User className="w-4 h-4" />, 'Myself')}
                {renderToggleButton('other', <Users className="w-4 h-4" />, 'Someone else')}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {bookingFor === 'self' ? renderSelfProfile() : renderOtherProfiles()}
            </div>

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
