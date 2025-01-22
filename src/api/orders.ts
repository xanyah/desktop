import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getOrders = params =>
  xanyahApi.get<Order[]>('orders', decamelizeKeys({params}))

export const getOrder = (orderId) =>
  xanyahApi.get<Order>(`orders/${orderId}`)

export const updateOrder = (orderId, params) =>
  xanyahApi.patch<Order>(`orders/${orderId}`, decamelizeKeys(params))

export const createOrder = newOrder =>
  xanyahApi.post<Order>('orders', decamelizeKeys(newOrder))

/** @deprecated */
export const searchOrder = params =>
  xanyahApi.get<Order[]>('orders/search', decamelizeKeys({params}))
