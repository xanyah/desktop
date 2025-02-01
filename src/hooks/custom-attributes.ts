import { useQuery } from '@tanstack/react-query'
import { getCustomAttributes, getCustomAttribute } from '../api'
import { validate } from 'uuid'

export const useCustomAttributes = (filters) => useQuery({
  queryFn: () => getCustomAttributes(filters),
  queryKey: ['customAttributes', filters],
})

export const useCustomAttribute = (id) => useQuery({
  queryFn: () => getCustomAttribute(id),
  enabled: validate(id),
  queryKey: ['customAttributes', {id}],
})
