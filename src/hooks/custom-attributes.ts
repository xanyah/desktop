import { useQuery } from '@tanstack/react-query'
import { getCustomAttributes } from '../api'

export const useCustomAttributes = (filters) => useQuery({
  queryFn: () => getCustomAttributes(filters),
  queryKey: ['customAttributes', filters],
})
