import { AxiosResponse } from 'axios'
import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getStores = (): Promise<AxiosResponse<Store[]>> =>
  xanyahApi.get('stores', decamelizeKeys({}))


export const updateStore = (storeId, params) =>
  xanyahApi.patch(`stores/${storeId}`, decamelizeKeys(params))
