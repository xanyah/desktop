import { useQuery } from '@tanstack/react-query'
import { getProducts, getVariants } from '../api'

export const useProducts = (filters) => useQuery({
  queryFn: () => getProducts(filters),
  queryKey: ['products', filters],
})

export const useProduct = (id) => useQuery({
  queryFn: () => getProducts(id),
  queryKey: ['products', {id}],
})

export const useProductVariants = filters => useQuery({
  queryFn: () => getVariants(filters),
  queryKey: ['productVariants', filters]
})
