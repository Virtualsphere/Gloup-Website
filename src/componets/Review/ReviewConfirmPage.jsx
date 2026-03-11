import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
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
import { useBookingStore } from '../../store/bookingStore';
import { useCreateOrder } from '../../hooks/services/useCreateOrder';
import { usePaymentSuccess } from '../../hooks/services/usePaymentSuccess';
import { calculateBilling } from '../../utils/calculateBilling';
import { buildBookingPayload } from '../../services/bookingPayloadBuilder';
import { useRazorpayCheckout } from '../../hooks/payment/useRazorpayCheckout';

const ReviewConfirmPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // ─── Read from Store ────────────────────────────────────────────────────────
  const salon           = useBookingStore((s) => s.salon);
  const selectedServices = useBookingStore((s) => s.selectedServices);
  const addOnServices   = useBookingStore((s) => s.addOnServices);
  const slot            = useBookingStore((s) => s.slot);
  const removeService   = useBookingStore((s) => s.removeService);
  const removeAddOn     = useBookingStore((s) => s.removeAddOn);
  const resetBooking    = useBookingStore((s) => s.resetBooking);

  // Merge selected + add-on services for billing
  const allServices = [...selectedServices, ...addOnServices];

  // Format the stored Date + slot into display strings
  const bookingDate = slot.selectedDate
    ? format(slot.selectedDate, 'dd-MM-yyyy')
    : '—';
  const bookingTime = slot.selectedSlot?.time ?? '—';

  // ─── Local UI State ─────────────────────────────────────────────────────────
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [useWallet, setUseWallet]         = useState(false);
  const [toastMessage, setToastMessage]   = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // ─── Billing ────────────────────────────────────────────────────────────────
  const platformFee    = 7;
  const isPlatformFree = true;
  const walletBalance  = 70;

  const billingProps = calculateBilling({
    allServices,
    appliedCoupon,
    useWallet,
    walletBalance,
    platformFee,
    isPlatformFree,
  });

  const { finalAmount, walletUsed, gstAmount } = billingProps;

  // ─── API Mutations & Hooks ──────────────────────────────────────────────────
  const createOrderMutation  = useCreateOrder();
  const paymentSuccessMutation = usePaymentSuccess();
  const isPaying = createOrderMutation.isPending;
  const { openRazorpay } = useRazorpayCheckout();

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleRemoveService = (id) => {
    const isSelected = selectedServices.some((s) => s.id === id);
    const serviceName = allServices.find((s) => s.id === id)?.name ?? '';
    if (isSelected) {
      removeService(id);
    } else {
      removeAddOn(id);
    }
    setToastMessage(`Removed "${serviceName}"`);
    setIsToastVisible(true);
  };

  const navigate = useNavigate();

  const handlePay = () => {
    const { bookingFor, slot: storeSlot } = useBookingStore.getState();

    const payload = buildBookingPayload({
      salon,
      storeSlot,
      selectedServices,
      bookingFor,
      finalAmount,
      useWallet,
      walletUsed,
      appliedCoupon,
      gstAmount,
      isPlatformFree,
      platformFee,
    });

    console.log('📦 Create Order Payload:', payload);

    createOrderMutation.mutate(payload, {
      onSuccess: (data) => {
        console.log('✅ Order Created:', data);
        openRazorpay(data.data, (response) => {
          paymentSuccessMutation.mutate(
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              onSuccess: () => {
                resetBooking();
                toast.success('Booking confirmed! 🎉');
                navigate('/my-bookings');
              },
              onError: (err) => {
                console.error('❌ paymentSuccess API failed:', err);
                toast.error(
                  err?.response?.data?.message ?? 'Payment verification failed. Please contact support.'
                );
              },
            }
          );
        });
      },
      onError: (error) => {
        console.error('❌ Order Creation Failed:', error);
        toast.error(
          error?.response?.data?.message ?? 'Failed to create order. Please try again.'
        );
      },
    });
  };

  // ─── Salon name for breadcrumb ───────────────────────────────────────────────
  const salonName = salon.name || 'Salon';

  return (
    <div className="bg-gray-100 min-h-screen pb-40 lg:pb-8">

      {/* Desktop wrapper */}
      <div className="lg:px-10 xl:px-32 lg:pt-6">

        {/* Breadcrumb + Title (desktop only) */}
        <div className="hidden lg:block mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/shop-details/${salon.id}`} className="hover:text-gray-600 transition-colors">{salonName}</Link>
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
              <BookingDetailCard
                services={allServices}
                onRemove={handleRemoveService}
              />
              <BookingForSection />

              {/* Coupon + Billing visible on mobile only */}
              <div className="lg:hidden mt-8 px-1">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Coupons &amp; Offers</h2>
                <CouponSection
                  appliedCoupon={appliedCoupon}
                  onApplyCoupon={setAppliedCoupon}
                />
                <BillingSummary {...billingProps} />
              </div>

              {/* You might also like – self-contained, reads from store */}
              <YouMightLikeSection />
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
              isLoading={isPaying}
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
        <PayButtonBar amount={finalAmount} onPay={handlePay} isLoading={isPaying} />
      </div>
    </div>
  );
};

export default ReviewConfirmPage;