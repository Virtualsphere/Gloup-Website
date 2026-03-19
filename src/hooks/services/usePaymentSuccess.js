import { useMutation } from "@tanstack/react-query";
import { paymentSuccess } from "../../api/paymentSuccess.api";

export const usePaymentSuccess = () => {
  return useMutation({
    mutationFn: paymentSuccess,
  });
};
