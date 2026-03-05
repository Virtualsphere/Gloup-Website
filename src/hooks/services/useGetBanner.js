import { useQuery } from '@tanstack/react-query';
import { getBanner } from '../../api/getBanner.api';

export const useGetBanner = () => {
  return useQuery({
    queryKey: ['banner'],
    queryFn: getBanner,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};