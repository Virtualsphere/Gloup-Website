import { useQuery } from "@tanstack/react-query";
import { getFavourites } from "../../api/getFavourites.api";
import { useAuthStore } from "../../store/authStore";

/**
 * Hook to fetch all favourite salons for the logged-in user.
 * Only runs when the user is authenticated.
 *
 * Usage:
 *   const { data, isLoading } = useGetFavourites();
 *   const favourites = data?.data ?? [];
 */
export const useGetFavourites = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ["favourites"],
    queryFn: getFavourites,
    enabled: isAuthenticated, // don't call API if not logged in
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};
