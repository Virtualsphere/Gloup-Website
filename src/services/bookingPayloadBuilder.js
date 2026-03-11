import { format } from 'date-fns';

export const buildBookingPayload = ({
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
}) => {
  // ── Build services array expected by the backend ──
  const servicesPayload = selectedServices.map((s) => ({
    service_id: s.id,
  }));

  // ── Guest fields (only sent when booking for someone else) ──
  const isForOther = bookingFor.type === 'other';
  const guest = bookingFor.guest;

  return {
    store_id: salon.id,
    slot_id: storeSlot.selectedSlot?.raw?.id ?? storeSlot.selectedSlot?.id ?? null,
    booking_date: storeSlot.selectedDate
      ? format(new Date(storeSlot.selectedDate), 'yyyy-MM-dd')
      : null,
    services: servicesPayload,
    combos: [],
    is_combo: false,
    booking_for: isForOther ? 'guest' : 'myself',
    guest_id: isForOther && guest?.id ? guest.id : undefined,
    guest_name: isForOther && guest?.name ? guest.name : undefined,
    guest_phone: isForOther && guest?.phone ? guest.phone : undefined,
    guest_gender: isForOther && guest?.gender ? guest.gender : undefined,
    professional_id: null,
    amount: finalAmount,
    is_wallet: useWallet,
    wallet_amount_used: walletUsed,
    is_discounted: !!appliedCoupon,
    discount_id: appliedCoupon?.id ?? null,
    coupon_code: appliedCoupon?.code ?? null,
    gst: gstAmount,
    platform_fee: isPlatformFree ? 0 : platformFee,
  };
};
