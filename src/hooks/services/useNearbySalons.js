import { useQuery } from "@tanstack/react-query";
import { getNearbySalons } from "../../api/nearbyStore.api";
import { useLocationStore } from "../../store/locationStore";

export const useNearbySalons = () => {
  const { location } = useLocationStore();

  return useQuery({
    queryKey: ["nearbySalons", location],
    queryFn: () => getNearbySalons(location),
    enabled: !!location?.lat && !!location?.lng,
    refetchOnMount: true,
  refetchOnWindowFocus: false,
  staleTime: 0,
  });
};