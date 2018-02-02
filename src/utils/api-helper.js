import { xanyahApi } from '../constants'

export const validateToken = () => xanyahApi.get('auth/validate_token')

export const signIn = params => xanyahApi.post('auth/sign_in', params)

export const getProviders = () => xanyahApi.get('providers')

export const getStores = () => xanyahApi.get('stores')
export const updateStore = (storeId, params) => xanyahApi.patch(`stores/${storeId}`, params)

export const updateUserParams = params => xanyahApi.patch('auth', params)

export const getCategories = () => xanyahApi.get('categories')
