import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getClients = params =>
  xanyahApi.get<Client[]>('clients', decamelizeKeys({params}))

export const updateClient = (clientId, params) =>
  xanyahApi.patch<Client>(`clients/${clientId}`, decamelizeKeys(params))

export const createClient = newClient =>
  xanyahApi.post<Client>('clients', decamelizeKeys(newClient))

/** @deprecated */
export const searchClient = params =>
  xanyahApi.get('clients/search', decamelizeKeys({params}))
