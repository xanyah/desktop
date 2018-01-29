import { xanyahApi } from '../constants'
import { tvaApi } from '../constants'

export const validateToken = () => xanyahApi.get('auth/validate_token')

export const signIn = params => xanyahApi.post('auth/sign_in', params)

export const getProviders = () => xanyahApi.get('providers')

export const getStores = () => xanyahApi.get('stores')
export const updateStore = (storeId, params) => xanyahApi.patch(`stores/${storeId}`, params)

export const getTvaSettings = (countryCode) => tvaApi.get(`rate/${countryCode}`)
