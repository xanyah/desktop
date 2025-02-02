import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getCategories = params =>
  xanyahApi.get<Category[]>('v2/categories', decamelizeKeys({ params }))

export const getCategory = categoryId =>
  xanyahApi.get<Category>(`v2/categories/${categoryId}`)

export const updateCategory = (categoryId, params) =>
  xanyahApi.patch<Category>(`v2/categories/${categoryId}`, decamelizeKeys(params))

export const createCategory = newCategory =>
  xanyahApi.post<Category>('v2/categories', decamelizeKeys(newCategory))
