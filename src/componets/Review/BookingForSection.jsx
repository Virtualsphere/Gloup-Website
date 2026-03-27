import React, { useState } from 'react';
import { User, Users } from 'lucide-react';
import UserProfileCard from './UserProfileCard';
import AddPersonModal from './AddPersonModal';
import { useGetAllGuest } from '../../hooks/services/useGetAllGuest';
import { useAddGuest } from '../../hooks/services/useAddGuest';
import { useUpdateGuest } from '../../hooks/services/useUpdateGuest';
import { toast } from 'react-hot-toast';
import { useBookingStore } from '../../store/bookingStore';
import CompleteProfileModal from './CompleteProfileModal';
import { useUserStore } from '../../store/userStore';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { useUserProfile } from '../../hooks/useUserProfile';

const BookingForSection = () => {
    // --- State ---
    const [bookingFor, setBookingForLocal] = useState('self');
    const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);
    const [selectedProfileId, setSelectedProfileId] = useState(null);
    const [editingPerson, setEditingPerson] = useState(null);

    // --- Store ---
    const setBookingFor = useBookingStore((s) => s.setBookingFor);
    const isProfileModalOpen = useBookingStore((s) => s.isProfileModalOpen);
    const setIsProfileModalOpen = useBookingStore((s) => s.setIsProfileModalOpen);
    const { user, setUser } = useUserStore();
    const { mutate: updateProfile } = useUpdateProfile();
    const { isLoading: isProfileLoading } = useUserProfile();

    // --- API Hooks ---
    const { data: guestsResponse, isLoading, refetch } = useGetAllGuest();
    const addGuestMutation = useAddGuest();
    const updateGuestMutation = useUpdateGuest();

    const otherProfiles = guestsResponse?.data || [];

    // --- Handlers ---
    /** Toggle between 'self' and 'other', reset guest selection */
    const handleBookingForToggle = (type) => {
        setBookingForLocal(type);
        setSelectedProfileId(null);
        // Immediately commit to store with no guest
        setBookingFor({ type, guest: null });

        if (type === 'self') {
             const hasName = user?.firstname && user?.lastname;
             if (!hasName) {
                 setIsProfileModalOpen(true);
             }
        }
    };

    const handleSaveSelfProfile = (personData) => {
        const payload = {
            firstname: personData.firstname,
            lastname: personData.lastname,
            email: personData.email,
            dob: personData.dob,
            gender: personData.gender
        };

        // Optimistic update
        setUser({ ...user, ...payload });

        const data = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                data.append(key, value);
            }
        });

        updateProfile(data);
        setIsProfileModalOpen(false);
    };

    const handleGuestSelect = (index, profile) => {
        setSelectedProfileId(index);
        // Commit selected guest to store
        setBookingFor({
            type: 'other',
            guest: {
                id: profile._id ?? profile.id ?? null,
                name: profile.name,
                age: profile.age ?? null,
                gender: profile.gender ?? null,
                phone: profile.phone ?? null,
            },
        });
    };

    const handleSavePerson = (personData) => {
        const payload = {
            name: personData.fullName,
            gender: personData.gender,
            age: Number(personData.age),
            phone: personData.phone
        };

        if (editingPerson) {
            // --- UPDATE existing guest ---
            const guestId = editingPerson._id ?? editingPerson.id;
            const loadingToastId = toast.loading('Updating guest...');
            updateGuestMutation.mutate(
                { guestId, ...payload },
                {
                    onSuccess: () => {
                        toast.success('Guest updated successfully', { id: loadingToastId });
                        refetch();
                        setEditingPerson(null);
                        setIsAddPersonModalOpen(false);
                    },
                    onError: (error) => {
                        toast.error('Failed to update guest', { id: loadingToastId });
                        // console.error('Update guest error:', error);
                    }
                }
            );
            return;
        }

        // --- ADD new guest ---
        const loadingToastId = toast.loading('Adding guest...');
        addGuestMutation.mutate(payload, {
            onSuccess: () => {
                toast.success('Guest added successfully', { id: loadingToastId });
                refetch();
                setIsAddPersonModalOpen(false);
            },
            onError: (error) => {
                toast.error('Failed to add guest', { id: loadingToastId });
                // console.error('Add guest error:', error);
            }
        });
    };

    const handleEditProfile = (profile) => {
        // Pass the raw profile object so the modal can pre-fill correctly
        setEditingPerson(profile);
        setIsAddPersonModalOpen(true);
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
                onClick={() => handleBookingForToggle(type)}
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

    const renderSelfProfile = () => {
        if (isProfileLoading && !user?.firstname) {
            return (
                <div className="p-4 border border-gray-100 rounded-2xl h-24 animate-pulse bg-gray-50 flex items-center justify-center">
                    <span className="text-gray-400 font-medium">Loading profile...</span>
                </div>
            );
        }

        const hasName = user?.firstname && user?.lastname;
        const displayName = hasName ? `${user.firstname} ${user.lastname}` : '';

        return (
            <UserProfileCard 
                name={displayName} 
                isSelected={true}
                onSelect={() => {
                   if (!hasName) setIsProfileModalOpen(true);
                }}
                onEdit={() => setIsProfileModalOpen(true)}
            />
        );
    };

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
                        onSelect={() => handleGuestSelect(index, profile)}
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

            <CompleteProfileModal 
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                onSave={handleSaveSelfProfile}
                initialData={
                    user ? {
                        firstname: user.firstname || '',
                        lastname: user.lastname || '',
                        email: user.email || '',
                        dob: user.dob || user.date_of_birth || '',
                        gender: user.gender || 'Male',
                    } : null
                }
            />
        </div>
    );
};

export default BookingForSection;
