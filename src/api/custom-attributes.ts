import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getCustomAttributes = params =>
  xanyahApi.get('custom_attributes', decamelizeKeys({params}))
export const updateCustomAttribute = (customAttributeId, params) =>
  xanyahApi.patch(`custom_attributes/${customAttributeId}`, decamelizeKeys(params))
export const createCustomAttribute = newCustomAttribute =>
  xanyahApi.post('custom_attributes', decamelizeKeys(newCustomAttribute))
