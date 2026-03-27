import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../../api/getAppointments.api";
import { useAuthStore } from "../../store/authStore";

/**
 * Hook to fetch all appointments for the logged-in user.
 * Only runs when the user is authenticated.
 *
 * Usage:
 *   const { data, isLoading } = useGetAppointments();
 *   const appointments = data?.data ?? [];
 */
export const useGetAppointments = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};
