import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllSalons } from "../../api/getAllSalons.api";

/**
 * Infinite-scroll hook for GET /app/v2/get-all-stores.
 *
 * Usage:
 *   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
 *     useGetAllSalons({ limit: 8, gender: 'female' });
 *
 *   const salons = data?.pages.flatMap((p) => p.data) ?? [];
 */
export const useGetAllSalons = (filters = {}) => {
  return useInfiniteQuery({
    queryKey: ["allSalons", filters],
    queryFn: ({ pageParam = 1 }) =>
      getAllSalons({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination ?? {};
      if (!currentPage || !totalPages) return undefined;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
