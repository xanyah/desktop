import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getProviders = params =>
  xanyahApi.get<Provider[]>('v2/providers', decamelizeKeys({params}))

export const getProvider = (providerId) =>
  xanyahApi.get<Provider>(`v2/providers/${providerId}`)

export const updateProvider = (providerId, params) =>
  xanyahApi.patch<Provider>(`v2/providers/${providerId}`, decamelizeKeys(params))

export const createProvider = newProvider =>
  xanyahApi.post<Provider>('v2/providers', decamelizeKeys(newProvider))


/** @deprecated */
export const searchProvider = params =>
  xanyahApi.get('providers/search', decamelizeKeys({params}))
