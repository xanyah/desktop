import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getClients = (params) =>
  xanyahApi.get<Client[]>('clients', decamelizeKeys({ params }))

export const searchClient = (params) =>
  xanyahApi.get<Client[]>('clients/search', decamelizeKeys({ params }))

export const updateClient = (clientId, params) =>
  xanyahApi.patch(`clients/${clientId}`, decamelizeKeys(params))

export const createClient = (newClient) =>
  xanyahApi.post('clients', decamelizeKeys(newClient))
