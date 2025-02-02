import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getStores = params =>
  xanyahApi.get<Store[]>('v2/stores', decamelizeKeys({ params }))

export const getStoreMemberships = params =>
  xanyahApi.get<StoreMembership[]>('v2/store_memberships', decamelizeKeys({ params }))

export const updateStore = (storeId, params) =>
  xanyahApi.patch<Store>(`v2/stores/${storeId}`, decamelizeKeys(params))

export const getStoreMemberships = params =>
  xanyahApi.get<StoreMembership[]>('v2/store_memberships', decamelizeKeys({ params }))
