import { useMutation } from "@tanstack/react-query";
import { googleLogin } from "../../../api/auth/googleLogin";
import { useAuthStore } from "../../../store/authStore";
import { useUserStore } from "../../../store/userStore";

export const useGoogleLogin = () => {
    const login = useAuthStore((state) => state.login);
    const setUser = useUserStore((state) => state.setUser);

    return useMutation({
        mutationFn: googleLogin,
        onSuccess: (data) => {
            const token = data?.data?.token;
            if (token) {
                login(token);
            }
            if (data?.data?.user) {
                setUser(data.data.user);
            } else if (data?.data) {
                setUser(data.data);
            }
        },
    });
};
