"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProduct() {
  const {
    refetch,
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios("/api/products");
      return res.data;
    },
  });
  return { products, refetch, isLoading, isError, error };
}
