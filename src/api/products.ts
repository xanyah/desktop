import { decamelizeKeys } from 'humps'
import { xanyahApi } from '../constants'

export const getProducts = params =>
  xanyahApi.get('products', decamelizeKeys({params}))
export const updateProduct = (productId, params) =>
  xanyahApi.patch(`products/${productId}`, decamelizeKeys(params))
export const createProduct = newProduct =>
  xanyahApi.post('products', decamelizeKeys(newProduct))
