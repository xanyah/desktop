import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getOrders = params =>
  xanyahApi.get('orders', decamelizeKeys({params}))

export const getOrder = (orderId) =>
  xanyahApi.get(`orders/${orderId}`)

export const updateOrder = (orderId, params) =>
  xanyahApi.patch(`orders/${orderId}`, decamelizeKeys(params))

export const createOrder = newOrder =>
  xanyahApi.post('orders', decamelizeKeys(newOrder))

export const searchOrder = params =>
  xanyahApi.get('orders/search', decamelizeKeys({params}))
