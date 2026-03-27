import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../../api/auth/logout";
import { useAuthStore } from "../../../store/authStore";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const storeLogout = useAuthStore((state) => state.logout);

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            // Clear auth store
            storeLogout();
            
            // Clear all react-query cache
            queryClient.clear();
        },
    });
};
