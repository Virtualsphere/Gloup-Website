import { useQuery } from "@tanstack/react-query";
import { getSlotStatus } from "../../api/slotBooking.api";

export const useGetSlots = (saloon_id, date) => {
  return useQuery({
    queryKey: ["slotStatus", saloon_id, date],
    queryFn: () => getSlotStatus({ saloon_id, date }),
    // Only run if we actually have an ID and a valid date string
    enabled: !!saloon_id && !!date,
  });
};
