import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getProviders = params =>
  xanyahApi.get('providers', decamelizeKeys({params}))
export const updateProvider = (providerId, params) =>
  xanyahApi.patch(`providers/${providerId}`, decamelizeKeys(params))
export const createProvider = newProvider =>
  xanyahApi.post('providers', decamelizeKeys(newProvider))
export const searchProvider = params =>
  xanyahApi.get('providers/search', decamelizeKeys({params}))
