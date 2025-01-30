import { useQuery } from '@tanstack/react-query'
import { getManufacturer, getManufacturers, searchManufacturer } from '../api'
import { validate } from 'uuid'

export const useManufacturers = (params) => useQuery({
  queryFn: () => getManufacturers(params),
  queryKey: ['manufacturers', params],
})

export const useManufacturer = (id) => useQuery({
  enabled: validate(id),
  queryFn: () => getManufacturer(id),
  queryKey: ['manufacturers', {id}],
})

export const useSearchedManufacturers = (searchQuery) => useQuery({
  enabled: !!searchQuery,
  queryFn: () => searchManufacturer(searchQuery),
  queryKey: ['manufacturers', searchQuery],
})
