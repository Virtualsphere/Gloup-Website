import { toast } from 'react-hot-toast';

export const useRazorpayCheckout = () => {

  const openRazorpay = (orderData, { onSuccess, onFailure, onDismiss }) => {

    const options = {
      key: import.meta.env.VITE_RAZOR_KEY,

      amount: orderData.amount,
      currency: orderData.currency ?? "INR",

      name: "Gloup",
      description: "Salon Booking",

      order_id: orderData.razorpay_order_id,

      theme: { color: "#000000" },

      handler: function (response) {
        if (onSuccess) {
          onSuccess(response);
        }
      },
      
      modal: {
        ondismiss: function() {
          if (onDismiss) {
            onDismiss();
          }
        }
      }
    };

    console.log("🧾 Razorpay options:", options);

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error("❌ Razorpay payment failed:", response.error);
      if (onFailure) {
        onFailure(response.error);
      } else {
        toast.error("Payment failed. Please try again.");
      }
    });

    rzp.open();
  };

  return { openRazorpay };
};