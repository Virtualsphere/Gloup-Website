import { useQuery } from "@tanstack/react-query";
import { getTopSalons } from "../../api/topSalons.api";
import { useLocationStore } from "../../store/locationStore";
import { useMemo } from "react";

export const useTopSalons = (filters = {}) => {
  const { location } = useLocationStore();

  const requestBody = useMemo(() => {
    let body = { ...filters };
    if (location?.lat && location?.lng) {
      body.lat = location.lat;
      body.lng = location.lng;
    }
    return body;
  }, [location, filters]);

  return useQuery({
    queryKey: ["topSalons", requestBody],
    queryFn: () => getTopSalons(requestBody),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};