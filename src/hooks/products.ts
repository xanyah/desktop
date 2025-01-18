import { useQuery } from "@tanstack/react-query";
import { getManufacturers, getProducts, searchManufacturer } from "../api";

export const useProducts = (filters) => useQuery({
  queryKey: ['products', filters],
  queryFn: () => getProducts(filters)
})
