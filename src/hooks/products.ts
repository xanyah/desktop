import { useQuery } from '@tanstack/react-query'
import { getProduct, getProducts } from '../api'
import { validate } from 'uuid'

export const useProducts = filters => useQuery({
  queryFn: () => getProducts(filters),
  queryKey: ['products', filters],
})

export const useProduct = id => useQuery({
  queryFn: () => getProduct(id),
  enabled: validate(id),
  queryKey: ['products', { id }],
})
