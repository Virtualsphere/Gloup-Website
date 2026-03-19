import React, { useState, useMemo } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingSearchBar from '../componets/MyBooking/BookingSearchBar';
import BookingTabs from '../componets/MyBooking/BookingTabs';
import BookingList from '../componets/MyBooking/BookingList';

// ─── Mock Data ─────────────────────────────────────────────────────────────────
// Replace with real API data when available
const MOCK_BOOKINGS = [
  {
    id: '1',
    bookingId: 'BK001',
    status: 'Upcoming',
    salonName: 'Beauty Lounge',
    salonLocation: 'Indiranagar, Bangalore',
    salonRating: 4.6,
    salonImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&q=80',
    isPremium: false,
    date: '2024-03-05',
    time: '02:00 PM',
    services: [
      { name: 'Facial',   price: 499 },
      { name: 'Manicure', price: 299 },
    ],
    paidAmount: 798,
  },
  {
    id: '2',
    bookingId: 'BK002',
    status: 'Upcoming',
    salonName: 'Glow Spa',
    salonLocation: 'Rajajinagar, Bangalore',
    salonRating: 4.9,
    salonImage: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=200&q=80',
    isPremium: true,
    date: '2024-03-08',
    time: '11:00 AM',
    services: [
      { name: 'Deep Tissue Massage', price: 1200 },
      { name: 'Hair Spa',            price: 599 },
    ],
    paidAmount: 1799,
  },
  {
    id: '3',
    bookingId: 'BK003',
    status: 'Completed',
    salonName: 'Urban Cuts',
    salonLocation: 'Koramangala, Bangalore',
    salonRating: 4.3,
    salonImage: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=200&q=80',
    isPremium: false,
    date: '2024-02-20',
    time: '10:00 AM',
    services: [
      { name: "Men's Haircut", price: 299 },
      { name: 'Beard Trim',   price: 150 },
    ],
    paidAmount: 449,
  },
  {
    id: '4',
    bookingId: 'BK005',
    status: 'Cancelled',
    salonName: 'Urban Salon',
    salonLocation: 'BTM Layout, Bangalore',
    salonRating: 4.4,
    salonImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&q=80',
    isPremium: false,
    date: '2024-02-15',
    time: '09:00 AM',
    services: [
      { name: 'Haircut', price: 249 },
    ],
    paidAmount: 249,
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
const MyBooking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]     = useState('Upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter by tab + search query
  const filteredBookings = useMemo(() => {
    return MOCK_BOOKINGS
      .filter((b) => b.status === activeTab)
      .filter((b) =>
        searchQuery.trim() === '' ||
        b.salonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.bookingId.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [activeTab, searchQuery]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
  };

  return (
    // lg:hidden makes the whole page invisible on desktop (mobile-only)
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
      <BookingList bookings={filteredBookings} activeTab={activeTab} />

    </div>
  );
};

export default MyBooking;
