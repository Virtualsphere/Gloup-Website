import { useQuery } from '@tanstack/react-query';
import { getCategory } from '../../api/getCategory.api';

export const useGetCategory = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: getCategory,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
