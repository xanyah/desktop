import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getOrders = params =>
  xanyahApi.get<Order[]>('v2/orders', decamelizeKeys({params}))

export const getOrder = (orderId) =>
  xanyahApi.get<Order>(`v2/orders/${orderId}`)

export const cancelOrder = (orderId) =>
  xanyahApi.patch<Order>(`v2/orders/${orderId}/cancel`)

export const withdrawOrder = (orderId) =>
  xanyahApi.patch<Order>(`v2/orders/${orderId}/withdraw`)

export const deliverOrder = (orderId) =>
  xanyahApi.patch<Order>(`v2/orders/${orderId}/deliver`)

export const orderOrder = (orderId) =>
  xanyahApi.patch<Order>(`v2/orders/${orderId}/order`)

export const createOrder = newOrder =>
  xanyahApi.post<Order>('v2/orders', decamelizeKeys(newOrder))

export const getOrderProducts = params =>
  xanyahApi.get<OrderProduct[]>('v2/order_products', decamelizeKeys({params}))
