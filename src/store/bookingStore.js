import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? '';

/**
 * Resolve a raw image path from the API to a full URL.
 * If the path is already absolute (starts with http), leave it as-is.
 */
const resolveImageUrl = (rawPath) => {
  if (!rawPath) return '';
  if (rawPath.startsWith('http')) return rawPath;
  return `${IMAGE_BASE_URL}/${rawPath}`.replace(/([^:])\/\/+/g, '$1/');
};


/**
 * useBookingStore
 *
 * Central store for the entire booking flow.
 *
 * Slices
 * ──────
 * salon            – shop details (set once when ShopDetails page loads API data)
 * selectedServices – services the user added from the Services section
 * slot             – the date + time-slot the user picked on Book Slot page
 * bookingFor       – whether the booking is for "self" or "other", + guest profile
 * addOnServices    – services added from "You might also like" on the Review page
 *
 * Final payload shape (for reference):
 * {
 *   salonId, selectedServices, addOnServices,
 *   slot: { date, time, rawSlot },
 *   bookingFor: { type, guest }
 * }
 */
export const useBookingStore = create(
  persist(
    (set, get) => ({
  // ─── Salon ────────────────────────────────────────────────────────────────
  salon: {
    id: null,
    name: "",
    rating: null,
    reviewCount: null,
    gender: "",
    address: "",
    imageUrl: "",
    isVerified: false,
  },

  setSalon: (salonData) =>
    set({
      salon: {
        id: salonData.id ?? salonData._id ?? null,
        name: salonData.name ?? "",
        rating: salonData.averageRating ?? salonData.rating ?? null,
        reviewCount: salonData.totalReviews ?? salonData.reviewCount ?? null,
        gender: salonData.gender ?? "",
        address: salonData.location?.address ?? salonData.address ?? "",
        imageUrl: resolveImageUrl(
          salonData.images?.[0] ?? salonData.imageUrl ?? ""
        ),
        isVerified: salonData.isVerified ?? false,
      },
    }),

  // ─── Selected Services (from ShopDetails → Services section) ──────────────
  selectedServices: [],

  /**
   * Toggle a service object in/out of selectedServices.
   * Keeps the full service object so billing can use price/discount info.
   */
  toggleService: (service) =>
    set((state) => {
      const exists = state.selectedServices.some((s) => s.id === service.id);
      return {
        selectedServices: exists
          ? state.selectedServices.filter((s) => s.id !== service.id)
          : [...state.selectedServices, service],
      };
    }),

  /** Remove a service by id (used by the remove ✕ button in BookingDetailCard). */
  removeService: (serviceId) =>
    set((state) => ({
      selectedServices: state.selectedServices.filter((s) => s.id !== serviceId),
    })),

  // ─── Slot (from Book Slot page) ────────────────────────────────────────────
  slot: {
    selectedDate: null,   // JS Date object
    selectedSlot: null,   // raw slot object from API  { time, status, raw, ... }
  },

  setSlot: ({ selectedDate, selectedSlot }) =>
    set((state) => ({
      slot: {
        ...state.slot,
        ...(selectedDate !== undefined ? { selectedDate } : {}),
        ...(selectedSlot !== undefined ? { selectedSlot } : {}),
      },
    })),

  // ─── Booking For (from Review page → BookingForSection) ───────────────────
  bookingFor: {
    type: "self",   // "self" | "other"
    guest: null,    // { id, name, age, gender, phone } or null
  },

  setBookingFor: ({ type, guest = null }) =>
    set({
      bookingFor: { type, guest },
    }),

  // ─── Add-on Services (from Review page → YouMightLikeSection) ─────────────
  addOnServices: [],

  /**
   * Toggle an add-on (from "You might also like").
   * Kept separate from selectedServices so billing can split them if needed.
   */
  toggleAddOn: (service) =>
    set((state) => {
      const exists = state.addOnServices.some((s) => s.id === service.id);
      return {
        addOnServices: exists
          ? state.addOnServices.filter((s) => s.id !== service.id)
          : [...state.addOnServices, service],
      };
    }),

  /** Remove an add-on service by id. */
  removeAddOn: (serviceId) =>
    set((state) => ({
      addOnServices: state.addOnServices.filter((s) => s.id !== serviceId),
    })),

  // ─── Applied Coupon ───────────────────────────────────────────────────────
  /** { code: string, savings: number } or null */
  appliedCoupon: null,

  /** Save an applied coupon (persisted to localStorage). */
  setAppliedCoupon: (coupon) => set({ appliedCoupon: coupon }),

  /** Remove the currently applied coupon. */
  clearCoupon: () => set({ appliedCoupon: null }),

  /** All services in the billing: selected + add-ons merged. */
  getAllServices: () => {
    const { selectedServices, addOnServices } = get();
    return [...selectedServices, ...addOnServices];
  },

  /** IDs of selected services (for the toggle button in Services.jsx). */
  getSelectedServiceIds: () =>
    new Set(get().selectedServices.map((s) => s.id)),

  /** IDs of add-on services (for the add button state in YouMightLikeSection). */
  getAddOnIds: () => get().addOnServices.map((s) => s.id),

  // ─── Reset ────────────────────────────────────────────────────────────────
  /** Full reset — call on logout or after successful payment. */
  resetBooking: () =>
    set({
      selectedServices: [],
      slot: { selectedDate: null, selectedSlot: null },
      bookingFor: { type: "self", guest: null },
      addOnServices: [],
      appliedCoupon: null,
    }),
  }),
  {
    name: "booking-store", 
    storage: createJSONStorage(() => localStorage), 
  }
));
