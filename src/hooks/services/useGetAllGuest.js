import { useQuery } from "@tanstack/react-query";
import { getAllGuest } from "../../api/getAllGuest.api";

export const useGetAllGuest = () => {
  return useQuery({
    queryKey: ["allGuests"],
    queryFn: getAllGuest,
  });
};
