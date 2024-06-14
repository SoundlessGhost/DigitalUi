"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useUser from "./useUser";

const useCart = () => {
  const [user] = useUser();

  const {
    refetch,
    data: cart = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email is not available");
      }

      const res = await axios(`/api/carts/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { cart, refetch, isLoading, isError, error };
};

export default useCart;
