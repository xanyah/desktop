import { useQuery } from "@tanstack/react-query";
import { getManufacturer, getManufacturers, searchManufacturer } from "../api";

export const useManufacturers = () => useQuery({
  queryKey: ['manufacturers'],
  queryFn: getManufacturers
})
export const useManufacturer = (id) => useQuery({
  queryKey: ['manufacturers', {id}],
  queryFn: () => getManufacturer(id)
})

export const useSearchedManufacturers = (searchQuery) => useQuery({
  queryKey: ['manufacturers', searchQuery],
  queryFn: () => searchManufacturer(searchQuery),
  enabled: !!searchQuery,
})
