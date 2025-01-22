import { useQuery } from '@tanstack/react-query'
import { getCustomAttributes, getCustomAttribute } from '../api'

export const useCustomAttributes = (filters) => useQuery({
  queryFn: () => getCustomAttributes(filters),
  queryKey: ['customAttributes', filters],
})

export const useCustomAttribute = (id) => useQuery({
  queryFn: () => getCustomAttribute(id),
  queryKey: ['customAttributes', {id}],
})
