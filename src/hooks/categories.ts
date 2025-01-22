import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api'

export const useCategories = (filters) => useQuery({
  queryFn: () => getCategories(filters),
  queryKey: ['categories', filters],
})
