import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getProviders = params =>
  xanyahApi.get<Provider[]>('providers', decamelizeKeys({params}))

export const getProvider = (providerId) =>
  xanyahApi.get<Provider>(`providers/${providerId}`)

export const updateProvider = (providerId, params) =>
  xanyahApi.patch<Provider>(`providers/${providerId}`, decamelizeKeys(params))

export const createProvider = newProvider =>
  xanyahApi.post<Provider>('providers', decamelizeKeys(newProvider))


/** @deprecated */
export const searchProvider = params =>
  xanyahApi.get('providers/search', decamelizeKeys({params}))
