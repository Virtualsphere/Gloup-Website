import { toast } from 'react-hot-toast';

export const useRazorpayCheckout = () => {

  const openRazorpay = (orderData, onSuccessCallback) => {

    const options = {
      key: import.meta.env.VITE_RAZOR_KEY,

      amount: orderData.amount,   // ✅ add this
      currency: orderData.currency ?? "INR",

      name: "Gloup",
      description: "Salon Booking",

      order_id: orderData.razorpay_order_id,

      theme: { color: "#000000" },

      handler: function (response) {
        if (onSuccessCallback) {
          onSuccessCallback(response);
        }
      }
    };

    console.log("🧾 Razorpay options:", options); // debug

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error("❌ Razorpay payment failed:", response.error);
      toast.error("Payment failed. Please try again.");
    });

    rzp.open();
  };

  return { openRazorpay };
};