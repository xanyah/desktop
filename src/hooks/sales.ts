import { useQuery } from '@tanstack/react-query'
import { getSale, getSales } from '../api'

export const useSales = (filters) => useQuery({
  queryFn: () => getSales(filters),
  queryKey: ['sales', filters],
})

export const useSale = (id) => useQuery({
  queryFn: () => getSale(id),
  queryKey: ['sales', {id}],
})
