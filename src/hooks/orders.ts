import { useQuery } from '@tanstack/react-query'
import { getOrder, getOrders, searchOrder } from '../api'

export const useOrders = (params = {}) => useQuery({
  queryFn: () => getOrders(params),
  queryKey: ['orders', params],
})

export const useOrder = (id) => useQuery({
  queryFn: () => getOrder(id),
  queryKey: ['orders', {id}],
})

export const useSearchedOrders = (searchQuery) => useQuery({
  enabled: !!searchQuery,
  queryFn: () => searchOrder(searchQuery),
  queryKey: ['orders', searchQuery],
})
