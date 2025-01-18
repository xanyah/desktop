import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getClients = params =>
  xanyahApi.get('clients', decamelizeKeys({params}))
export const updateClient = (clientId, params) =>
  xanyahApi.patch(`clients/${clientId}`, decamelizeKeys(params))
export const createClient = newClient =>
  xanyahApi.post('clients', decamelizeKeys(newClient))
export const searchClient = params =>
  xanyahApi.get('clients/search', decamelizeKeys({params}))
