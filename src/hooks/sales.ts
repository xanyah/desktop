import { useQuery } from '@tanstack/react-query'
import { getSale, getSalePayments, getSaleProducts, getSales } from '../api'

export const useSales = filters => useQuery({
  queryFn: () => getSales(filters),
  queryKey: ['sales', filters],
})

export const useSale = id => useQuery({
  queryFn: () => getSale(id),
  queryKey: ['sales', { id }],
})

export const useSaleProducts = filters => useQuery({
  queryFn: () => getSaleProducts(filters),
  queryKey: ['saleProducts', filters],
})
export const useSalePayments = filters => useQuery({
  queryFn: () => getSalePayments(filters),
  queryKey: ['salePayments', filters],
})
