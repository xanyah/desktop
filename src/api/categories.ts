import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getCategories = params =>
  xanyahApi.get('categories', decamelizeKeys({params}))
export const updateCategory = (categoryId, params) =>
  xanyahApi.patch(`categories/${categoryId}`, decamelizeKeys(params))
export const createCategory = newCategory =>
  xanyahApi.post('categories', decamelizeKeys(newCategory))
