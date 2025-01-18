import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api'

export const useProducts = (filters) => useQuery({
  queryFn: () => getProducts(filters),
  queryKey: ['products', filters],
})
