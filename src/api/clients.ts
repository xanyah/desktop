import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getClients = (params) =>
  xanyahApi.get<Client[]>('clients', decamelizeKeys({ params }))

export const getClient = (clientId?: Client['id']) =>
  xanyahApi.get<Client>(`clients/${clientId}`)

export const searchClient = (params) =>
  xanyahApi.get<Client[]>('clients/search', decamelizeKeys({ params }))

export const updateClient = (clientId: Client['id'], params: ClientPayloadUpdate) =>
  xanyahApi.patch(`clients/${clientId}`, decamelizeKeys(params))

export const createClient = (newClient: ClientPayloadCreate) =>
  xanyahApi.post('clients', decamelizeKeys(newClient))
