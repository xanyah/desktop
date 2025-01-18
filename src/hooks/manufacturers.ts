import { useQuery } from "@tanstack/react-query";
import { getManufacturers, searchManufacturer } from "../api";

export const useManufacturers = () => useQuery({
  queryKey: ['manufacturers'],
  queryFn: getManufacturers
})

export const useSearchedManufacturers = (searchQuery) => useQuery({
  queryKey: ['manufacturers', searchQuery],
  queryFn: () => searchManufacturer({
    query: searchQuery,
    storeId: '417e20b6-aaf7-449c-8dc6-6e36a1ac2c74'
  }),
  enabled: !!searchQuery,
})
