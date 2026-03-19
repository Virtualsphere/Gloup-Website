import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../../../api/auth/sendOtp";

export const useSendOtp = () => {
  return useMutation({
    mutationFn: (phone) => sendOtp(phone),
  });
};