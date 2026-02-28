import { useQuery } from "@tanstack/react-query";
import { getSalonDetails } from "../../api/salonDetails.api";

export const useGetSalonDetails = (store_id) => {
  return useQuery({
    queryKey: ["salonDetails", store_id],
    queryFn: () => getSalonDetails(store_id),
    enabled: !!store_id, // Only run when store_id exists
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes caching
  });
};