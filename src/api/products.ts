import { decamelizeKeys } from 'humps'
import { xanyahApi } from '../constants'

export const getProducts = params =>
  xanyahApi.get<Product[]>('v2/products', decamelizeKeys({ params }))

export const getNextProductSku = params =>
  xanyahApi.get<{ nextSku: number }>('v2/products/next_sku', decamelizeKeys({ params }))

export const getProduct = productId =>
  xanyahApi.get<Product>(`v2/products/${productId}`)

export const updateProduct = (productId, params) =>
  xanyahApi.patch<Product>(`v2/products/${productId}`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const archiveProduct = productId =>
  xanyahApi.patch<Product>(`v2/products/${productId}/archive`)

export const unarchiveProduct = productId =>
  xanyahApi.patch<Product>(`v2/products/${productId}/unarchive`)

export const createProduct = newProduct =>
  xanyahApi.post<Product>(`v2/products`, newProduct, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const getAiSuggestions = productId =>
  xanyahApi.post<{ title: string | null; description: string | null }>(`v2/products/${productId}/ai_suggestions`)
