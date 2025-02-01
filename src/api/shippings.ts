import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getShippings = params =>
  xanyahApi.get<Shipping[]>('v2/shippings', decamelizeKeys({params}))

export const getShipping = (shippingId) =>
  xanyahApi.get<Shipping>(`v2/shippings/${shippingId}`)

export const updateShipping = (shippingId, params) =>
  xanyahApi.patch<Shipping>(`v2/shippings/${shippingId}`, decamelizeKeys(params))

export const validateShipping = (shippingId) =>
  xanyahApi.patch<Shipping>(`v2/shippings/${shippingId}/validate`)

export const cancelShipping = (shippingId) =>
  xanyahApi.patch<Shipping>(`v2/shippings/${shippingId}/cancel`)

export const createShipping = newShipping =>
  xanyahApi.post<Shipping>('v2/shippings', decamelizeKeys(newShipping))

export const getShippingProducts = params =>
  xanyahApi.get<ShippingProduct[]>('v2/shipping_products', decamelizeKeys({params}))

export const getShippingProduct = id =>
  xanyahApi.get<ShippingProduct>(`v2/shipping_products/${id}`)
