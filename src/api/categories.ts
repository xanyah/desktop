import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getCategories = params =>
  xanyahApi.get<Category[]>('categories', decamelizeKeys({params}))

export const updateCategory = (categoryId, params) =>
  xanyahApi.patch<Category>(`categories/${categoryId}`, decamelizeKeys(params))

export const createCategory = newCategory =>
  xanyahApi.post<Category>('categories', decamelizeKeys(newCategory))
