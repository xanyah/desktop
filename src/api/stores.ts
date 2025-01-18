import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getStores = params =>
  xanyahApi.get('stores', decamelizeKeys({params}))
export const updateStore = (storeId, params) =>
  xanyahApi.patch(`stores/${storeId}`, decamelizeKeys(params))
