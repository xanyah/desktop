import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getCustomAttributes = params =>
  xanyahApi.get<CustomAttribute[]>('v2/custom_attributes', decamelizeKeys({params}))

export const getCustomAttribute = (customAttributeId) =>
  xanyahApi.get<CustomAttribute>(`v2/custom_attributes/${customAttributeId}`)

export const updateCustomAttribute = (customAttributeId, params) =>
  xanyahApi.patch<CustomAttribute>(`v2/custom_attributes/${customAttributeId}`, decamelizeKeys(params))

export const createCustomAttribute = newCustomAttribute =>
  xanyahApi.post<CustomAttribute>('v2/custom_attributes', decamelizeKeys(newCustomAttribute))
