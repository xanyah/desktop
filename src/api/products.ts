import { decamelizeKeys } from 'humps'
import { xanyahApi } from '../constants'

export const getProducts = params =>
  xanyahApi.get<Product[]>('v2/products', decamelizeKeys({ params }))

export const getProduct = (productId) =>
  xanyahApi.get<Product>(`v2/products/${productId}`)

export const updateProduct = (productId, params) =>
  xanyahApi.patch<Product>(`v2/products/${productId}`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })

export const createProduct = (newProduct) =>
  xanyahApi.post<Product>(`v2/products`, newProduct, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
