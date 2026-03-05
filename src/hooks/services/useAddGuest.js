import { useMutation } from "@tanstack/react-query";
import { addGuest } from "../../api/addGuest.api";

export const useAddGuest = () => {
  return useMutation({
    mutationFn: addGuest,
  });
};