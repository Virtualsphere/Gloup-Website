import { useQuery } from "@tanstack/react-query";
import { getTopSalons } from "../../api/topSalons.api";

export const useTopSalons = (filters = {}) => {
  return useQuery({
    queryKey: ["topSalons", filters],
    queryFn: () => getTopSalons(filters),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};