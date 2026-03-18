import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/userProfile.api";
import { useUserStore } from "../store/userStore";
import { useEffect } from "react";

export const useUserProfile = () => {
  const { setUser } = useUserStore();

  const query = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (query.data?.success && query.data?.data) {
      setUser(query.data.data);
    }
  }, [query.data, setUser]);

  return query;
};
