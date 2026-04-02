import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEnquiry } from '../api/enquiry.api';

export const useEnquiry = ({ onSuccess } = {}) => {
  return useMutation({
    mutationFn: createEnquiry,

    onSuccess: (data) => {
      toast.success(data?.message || 'Enquiry submitted successfully!');
      onSuccess?.(data);
    },

    onError: (error) => {
      const message =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        'Something went wrong. Please try again.';
      toast.error(message);
    },
  });
};
