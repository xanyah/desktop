import { xanyahApi } from '../constants'


export const validateToken = () => xanyahApi.get('auth/validate_token')


export const signIn = params => xanyahApi.post('auth/sign_in', params)

// Providers API Calls
export const getProviders = () => xanyahApi.get('providers')
export const updateProvider = (providerId, params )=>
  xanyahApi.patch(`providers/${providerId}`, params)

// Manufacturers API Calls
export const getManufacturers = () => xanyahApi.get('manufacturers')
export const updateManufacturer = (manufacturerId, params) =>
  xanyahApi.patch(`manufacturers/${manufacturerId}`, params)

// Stores API Calls
export const getStores = () => xanyahApi.get('stores')
export const updateStore = (storeId, params) =>
  xanyahApi.patch(`stores/${storeId}`, params)


export const updateUserParams = params => xanyahApi.patch('auth', params)


export const getCategories = () => xanyahApi.get('categories')
