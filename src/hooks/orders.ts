import { useQuery } from '@tanstack/react-query'
import { getOrder, getOrders, getOrderProducts } from '../api'

export const useOrders = (params = {}) => useQuery({
  queryFn: () => getOrders(params),
  queryKey: ['orders', params],
})

export const useOrderProducts = (params = {}) => useQuery({
  queryFn: () => getOrderProducts(params),
  queryKey: ['orderProducts', params],
})

export const useOrder = (id) => useQuery({
  queryFn: () => getOrder(id),
  queryKey: ['orders', {id}],
})
