import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../api/userProfile.api";
import toast from "react-hot-toast";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,

    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Profile updated successfully");

        queryClient.invalidateQueries({
          queryKey: ["userProfile"],
        });
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    },

    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during update";

      toast.error(errorMessage);
    },
  });
};