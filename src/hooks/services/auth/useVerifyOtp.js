import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../../../api/auth/verifyOtp";
import { useAuthStore } from "../../../store/authStore";

export const useVerifyOtp = () => {

    const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      const token = data?.data?.token;
      login(token);
    },
  });
};