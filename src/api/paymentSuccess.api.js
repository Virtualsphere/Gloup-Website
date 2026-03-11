import axiosInstance from "./axiosInstance";

/**
 * POST /app/v2/paymentsuccess
 *
 * Payload shape:
 * {
 *   razorpay_order_id,
 *   razorpay_payment_id,
 *   razorpay_signature
 * }
 */
export const paymentSuccess = async (payload) => {
  const response = await axiosInstance.post("/v2/paymentsuccess", payload);
  return response.data;
};
