import { useQuery } from "@tanstack/react-query";
import { getCoupon } from "../../api/getCoupon.api";

export const useGetCoupon = () => {
  return useQuery({
    queryKey: ["activeCoupons"],
    queryFn: getCoupon,
  });
};
