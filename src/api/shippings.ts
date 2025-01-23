import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getShippings = params =>
  xanyahApi.get<Shipping[]>('v2/shippings', decamelizeKeys({params}))

export const getShipping = (shippingId) =>
  xanyahApi.get<Shipping>(`v2/shippings/${shippingId}`)

export const updateShipping = (shippingId, params) =>
  xanyahApi.patch<Shipping>(`shippings/${shippingId}`, decamelizeKeys(params))

export const createShipping = newShipping =>
  xanyahApi.post<Shipping>('shippings', decamelizeKeys(newShipping))

export const getShippingVariants = params =>
  xanyahApi.get<ShippingVariant[]>('shipping_variants', decamelizeKeys({params}))

export const getShippingVariant = id =>
  xanyahApi.get<ShippingVariant>(`shipping_variants/${id}`)
