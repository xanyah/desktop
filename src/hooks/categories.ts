import { useQuery } from '@tanstack/react-query'
import { getCategories, getCategory } from '../api'
import { validate } from 'uuid'

export const useCategories = filters => useQuery({
  queryFn: () => getCategories(filters),
  queryKey: ['categories', filters],
})

export const useCategory = id => useQuery({
  queryFn: () => getCategory(id),
  enabled: validate(id),
  queryKey: ['categories', { id }],
})
