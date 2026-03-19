import axiosInstance from "./axiosInstance";

/**
 * POST /app/v2/createorder
 *
 * Payload shape (matches the backend's body destructuring):
 * {
 *   booking_date, slot_id, services, combos, is_combo,
 *   booking_for, guest_id, guest_name, guest_phone, guest_gender,
 *   professional_id, amount, is_wallet, is_discounted, discount_id,
 *   coupon_code, wallet_amount_used, gst, platform_fee, store_id
 * }
 */
export const createOrder = async (payload) => {
  const response = await axiosInstance.post("/app/v2/createorder", payload);
  return response.data;
};
