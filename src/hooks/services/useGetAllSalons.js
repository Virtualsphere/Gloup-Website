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
    initialPageParam: 1, // Required in React Query v5
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.pagination ?? {};
      const { page, totalPages } = pagination;
      if (!page || !totalPages) return undefined;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
