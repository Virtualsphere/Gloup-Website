import { toast } from "react-hot-toast";

export const useApiToast = () => {
  const showApiToast = (
    response,
    successMessage = "Success",
    toastId = "api-toast"
  ) => {
    if (response?.data?.data === successMessage) {
      toast.dismiss(toastId);
      toast.success(successMessage, { id: toastId });
    }
  };

  return { showApiToast };
};