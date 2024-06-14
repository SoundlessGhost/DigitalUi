"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useUser from "./useUser";

const useSpecificUserAddress = () => {
  const [user] = useUser();

  const {
    refetch,
    data: userAddress = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-address", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email is not available");
      }

      const res = await axios(`/api/user-address/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { userAddress, refetch, isLoading, isError, error };
};

export default useSpecificUserAddress;
