import { useQuery } from '@tanstack/react-query'
import { getShipping, getShippings, getShippingProduct, getShippingProducts } from '../api'

export const useShippings = (filters) => useQuery({
  queryFn: () => getShippings(filters),
  queryKey: ['shippings', filters],
})

export const useShipping = (id) => useQuery({
  queryFn: () => getShipping(id),
  queryKey: ['shippings', {id}],
})

export const useShippingProducts = (filters) => useQuery({
  queryFn: () => getShippingProducts(filters),
  queryKey: ['shippingProducts', filters],
})

export const useShippingProduct = (id) => useQuery({
  queryFn: () => getShippingProduct(id),
  queryKey: ['shippingProducts', {id}],
})
