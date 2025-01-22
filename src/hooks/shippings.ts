import { useQuery } from '@tanstack/react-query'
import { getShipping, getShippings, getShippingVariant, getShippingVariants } from '../api'

export const useShippings = (filters) => useQuery({
  queryFn: () => getShippings(filters),
  queryKey: ['shippings', filters],
})

export const useShipping = (id) => useQuery({
  queryFn: () => getShipping(id),
  queryKey: ['shippings', {id}],
})

export const useShippingVariants = (filters) => useQuery({
  queryFn: () => getShippingVariants(filters),
  queryKey: ['shippingVariants', filters],
})

export const useShippingVariant = (id) => useQuery({
  queryFn: () => getShippingVariant(id),
  queryKey: ['shippingVariants', {id}],
})
