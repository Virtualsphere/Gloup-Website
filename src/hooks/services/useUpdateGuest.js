import { useMutation } from "@tanstack/react-query";
import { updateGuest } from "../../api/updateGuest.api";

export const useUpdateGuest = () => {
  return useMutation({
    mutationFn: (data) => updateGuest(data),
  });
};
