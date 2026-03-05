import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SalonCard from '../BookSlot/SalonCard';
import BookingDetailCard from './BookingDetailCard';
import BookingForSection from './BookingForSection';
import CouponSection from './CouponSection';
import BillingSummary from './BillingSummary';
import WalletToggle from './WalletToggle';
import PayButtonBar from './PayButtonBar';
import YouMightLikeSection from './YouMightLikeSection';
import ToastNotification from './ToastNotification';
import DeskPaymentCard from './DeskPaymentCard';

// ─── Static Data ──────────────────────────────────────────────────────────────
const initialServices = [
  { id: 's1', name: "Men's Haircut", duration: '30 min', price: 299, isPopular: true },
  { id: 's2', name: "Beard Trim",    duration: '15 min', price: 150, isPopular: false },
];

const ReviewConfirmPage = () => {
  const location = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { bookingDate, bookingTime } = location.state || {
    bookingDate: '27-02-2026',
    bookingTime: '10:00 AM - 11:00 AM',
  };

  // State
  const [services, setServices] = useState(initialServices);
  const [addedServiceIds, setAddedServiceIds] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [useWallet, setUseWallet] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Constants
  const platformFee   = 7;
  const isPlatformFree = true;
  const walletBalance  = 70;

  // Calculations
  const baseAmount        = services.reduce((total, s) => total + s.price, 0);
  const couponDiscount    = appliedCoupon?.savings || 0;
  const subtotal          = Math.max(0, baseAmount - couponDiscount);
  const gstAmount         = Math.round(subtotal * 0.05);
  const totalBeforeWallet = subtotal + gstAmount + (isPlatformFree ? 0 : platformFee);
  const walletUsed        = useWallet ? Math.min(walletBalance, totalBeforeWallet) : 0;
  const finalAmount       = totalBeforeWallet - walletUsed;

  // Shared billing props
  const billingProps = {
    amount: baseAmount,
    couponDiscount,
    couponCode: appliedCoupon?.code,
    subtotal,
    gstAmount,
    isPlatformFree,
    platformFee,
    walletUsed,
    finalAmount,
    totalBeforeWallet,
  };

  const handleAddService = (service) => {
    const isAlreadyAdded = addedServiceIds.includes(service.id);
    if (isAlreadyAdded) {
      setServices(prev => prev.filter(s => s.id !== service.id));
      setAddedServiceIds(prev => prev.filter(id => id !== service.id));
      setToastMessage(`Removed "${service.name}"`);
    } else {
      setServices(prev => [...prev, service]);
      setAddedServiceIds(prev => [...prev, service.id]);
      setToastMessage(`Added "${service.name}"`);
    }
    setIsToastVisible(true);
  };

  const handlePay = () => {
    console.log('Processing payment for ₹', finalAmount, 'with services:', services);
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-40 lg:pb-8">

      {/* Desktop wrapper */}
      <div className="lg:px-10 xl:px-32 lg:pt-6">

        {/* Breadcrumb + Title (desktop only) */}
        <div className="hidden lg:block mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop-details" className="hover:text-gray-600 transition-colors">Mohan Men&apos;s Park Salon</Link>
            <span>/</span>
            <Link to="/book-slot" className="hover:text-gray-600 transition-colors">Book Slot</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Checkout</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* 2-column grid on desktop */}
        <div className="lg:grid lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px] lg:gap-8 lg:items-start">

          {/* ── Left: Main content ── */}
          <div className="lg:bg-gray lg:overflow-hidden lg:shadow-sm">
            <SalonCard
              showTime={true}
              bookingDate={bookingDate}
              bookingTime={bookingTime}
              rounded={false}
            />
            <div className="px-3 lg:px-0">
              <BookingDetailCard services={services} onRemove={(id) => {
                setServices(prev => prev.filter(s => s.id !== id));
                setAddedServiceIds(prev => prev.filter(sid => sid !== id));
              }} />
              <BookingForSection />

              {/* Coupon + Billing visible on mobile only (shown in sidebar on desktop) */}
              <div className="lg:hidden mt-8 px-1">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Coupons & Offers</h2>
                <CouponSection
                  appliedCoupon={appliedCoupon}
                  onApplyCoupon={setAppliedCoupon}
                />
                <BillingSummary {...billingProps} />
              </div>

              <YouMightLikeSection
                onAddService={handleAddService}
                addedServiceIds={addedServiceIds}
              />
            </div>
          </div>

          {/* ── Right: Sticky payment sidebar (desktop only) ── */}
          <div className="hidden lg:block">
            <DeskPaymentCard
              {...billingProps}
              appliedCoupon={appliedCoupon}
              onApplyCoupon={setAppliedCoupon}
              walletBalance={walletBalance}
              useWallet={useWallet}
              onToggleWallet={() => setUseWallet(w => !w)}
              onPay={handlePay}
            />
          </div>

        </div>
      </div>

      {/* Toast */}
      <ToastNotification
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />

      {/* Mobile: fixed bottom wallet + pay bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30">
        <div className="bg-white shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] pt-4 pb-2 px-6">
          <WalletToggle
            balance={walletBalance}
            useWallet={useWallet}
            onToggle={() => setUseWallet(w => !w)}
          />
        </div>
        <PayButtonBar amount={finalAmount} onPay={handlePay} />
      </div>
    </div>
  );
};

export default ReviewConfirmPage;