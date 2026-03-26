import React, { useState, useMemo } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingSearchBar from '../componets/MyBooking/BookingSearchBar';
import BookingTabs from '../componets/MyBooking/BookingTabs';
import BookingList from '../componets/MyBooking/BookingList';
import { useGetAppointments } from '../hooks/services/useGetAppointments';

const SALON_IMAGE_URL = import.meta.env.VITE_SALON_IMAGE_URL;

// ─── Map backend status → tab label ──────────────────────────────────────────
const mapStatus = (status) => {
  if (!status) return 'Upcoming';
  const s = status.toLowerCase();
  if (s === 'completed') return 'Completed';
  if (s === 'cancelled' || s === 'canceled') return 'Cancelled';
  return 'Upcoming';
};

// ─── Normalize a single appointment from the API ──────────────────────────────
const normalizeAppointment = (item) => {
  const storeId = item.store_id;
  const rawImages = item.images
    ? (typeof item.images === 'string' ? JSON.parse(item.images) : item.images)
    : [];
  const validImages = Array.isArray(rawImages)
    ? rawImages.filter((img) => img && img.trim() !== '')
    : [];

  const salonImage =
    validImages.length > 0
      ? `${SALON_IMAGE_URL}/${storeId}/images/${validImages[0]}`
      : 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&q=80';

  const locationParts = [item.addressLine1, item.city, item.district].filter(Boolean);
  const salonLocation = locationParts.join(', ') || 'Nearby';

  const slotFrom = item.slot_from ?? '';
  const slotTo   = item.slot_to ?? '';
  const time     = slotFrom && slotTo ? `${slotFrom} – ${slotTo}` : slotFrom || '—';

  const date = item.booking_date
    ? new Date(item.booking_date).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
      })
    : '—';

  return {
    id:           item.id,
    bookingId:    `#${String(item.id).slice(-6).toUpperCase()}`,
    status:        mapStatus(item.appointment_status),
    salonName:     item.name ?? 'Salon',
    salonLocation,
    salonRating:   Number(item.averagerating) || 0,
    salonImage,
    isPremium:     false,
    date,
    time,
    services:      [],           // services are not returned in list view
    paidAmount:    item.discounted_amount ?? item.total_amount ?? 0,
    storeId,
  };
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const BookingSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
    <div className="flex gap-3 p-4">
      <div className="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
    <div className="border-t border-gray-100 mx-4" />
    <div className="p-4 space-y-3">
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
      <div className="h-8 bg-gray-100 rounded-xl" />
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const MyBooking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]     = useState('Upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError } = useGetAppointments();

  // Normalize all appointments from the API
  const allBookings = useMemo(() => {
    const raw = data?.data ?? [];
    return Array.isArray(raw) ? raw.map(normalizeAppointment) : [];
  }, [data]);

  // Filter by tab + search query
  const filteredBookings = useMemo(() => {
    return allBookings
      .filter((b) => b.status === activeTab)
      .filter((b) =>
        searchQuery.trim() === '' ||
        b.salonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.bookingId.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [allBookings, activeTab, searchQuery]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 lg:px-10 xl:px-32 py-4 lg:hidden">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">My Bookings</h1>
        </div>

        {/* Search */}
        <BookingSearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Tabs */}
        <BookingTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="px-4 lg:px-10 xl:px-32 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {Array.from({ length: 4 }).map((_, i) => <BookingSkeleton key={i} />)}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-20 text-center px-6">
          <p className="text-gray-500 font-medium text-base">Failed to load bookings.</p>
          <p className="text-gray-400 text-sm mt-1">Please try again later.</p>
        </div>
      ) : (
        <BookingList bookings={filteredBookings} activeTab={activeTab} />
      )}

    </div>
  );
};

export default MyBooking;
