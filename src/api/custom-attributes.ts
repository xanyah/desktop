import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getCustomAttributes = params =>
  xanyahApi.get<CustomAttribute[]>('custom_attributes', decamelizeKeys({params}))
export const updateCustomAttribute = (customAttributeId, params) =>
  xanyahApi.patch<CustomAttribute>(`custom_attributes/${customAttributeId}`, decamelizeKeys(params))
export const createCustomAttribute = newCustomAttribute =>
  xanyahApi.post<CustomAttribute>('custom_attributes', decamelizeKeys(newCustomAttribute))
