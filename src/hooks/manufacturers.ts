import { useQuery } from '@tanstack/react-query'
import { getManufacturer, getManufacturers, searchManufacturer } from '../api'

export const useManufacturers = () => useQuery({
  queryFn: getManufacturers,
  queryKey: ['manufacturers'],
})
export const useManufacturer = (id) => useQuery({
  queryFn: () => getManufacturer(id),
  queryKey: ['manufacturers', {id}],
})

export const useSearchedManufacturers = (searchQuery) => useQuery({
  enabled: !!searchQuery,
  queryFn: () => searchManufacturer(searchQuery),
  queryKey: ['manufacturers', searchQuery],
})
