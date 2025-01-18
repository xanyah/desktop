import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getShippings = params =>
  xanyahApi.get('shippings', decamelizeKeys({params}))
export const updateShipping = (shippingId, params) =>
  xanyahApi.patch(`shippings/${shippingId}`, decamelizeKeys(params))
export const createShipping = newShipping =>
  xanyahApi.post('shippings', decamelizeKeys(newShipping))
