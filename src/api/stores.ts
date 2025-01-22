import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getStores = params =>
  xanyahApi.get<Store[]>('stores', decamelizeKeys({params}))

export const updateStore = (storeId, params) =>
  xanyahApi.patch<Store>(`stores/${storeId}`, decamelizeKeys(params))
