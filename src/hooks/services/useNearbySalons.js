// hooks/services/useNearbySalons.js

import { useQuery } from "@tanstack/react-query";
import { getNearbySalons } from "../../api/nearbyStore.api";
import { useLocationStore } from "../../store/locationStore";
import { useMemo } from "react";

export const useNearbySalons = (filters = {}) => {
  const { location } = useLocationStore();

  const requestBody = useMemo(() => {
    if (!location?.lat || !location?.lng) return null;

    return {
      lat: location.lat,
      lng: location.lng,
      ...filters,
    };
  }, [location, filters]);

  return useQuery({
    queryKey: ["nearbySalons", requestBody],
    queryFn: () => getNearbySalons(requestBody),
    enabled: !!requestBody,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};