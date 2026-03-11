import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavourite } from "../../api/toggleFavourite.api";

/**
 * Hook to toggle a salon's favourite status.
 * Automatically invalidates the "favourites" query so the list re-fetches.
 *
 * Usage:
 *   const { mutate: toggle, isPending } = useToggleFavourite();
 *   toggle(storeId);
 */
export const useToggleFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (storeId) => toggleFavourite(storeId),
    onSuccess: () => {
      // Refresh the favourites list after toggling
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });
};
