import { xanyahApi } from '../constants'
// TODO add decamelizeKeys
// import {
//   camelizeKeys,
//   decamelizeKeys,
// } from 'humps'

export const validateToken = () => xanyahApi.get('auth/validate_token')


export const signIn = params => xanyahApi.post('auth/sign_in', params)

// Variants API Calls

export const getVariants = params => xanyahApi.get('variants', {params})
export const updateVariant = (variantId, params) =>
  xanyahApi.patch(`variants/${variantId}`, params)
export const createVariant = newVariant => xanyahApi.post('variants', newVariant)
// Products API Calls

export const getProducts = params => xanyahApi.get('products', {params})
export const updateProduct = (productId, params) =>
  xanyahApi.patch(`products/${productId}`, params)

// Inventories API Calls

export const getInventories = params => xanyahApi.get('inventories', {params})

// Providers API Calls

export const getProviders = params => xanyahApi.get('providers', {params})
export const updateProvider = (providerId, params) =>
  xanyahApi.patch(`providers/${providerId}`, params)

export const createProvider = (newProvider) =>
  xanyahApi.post('providers', newProvider)


// Manufacturers API Calls

export const getManufacturers = params => xanyahApi.get('manufacturers', {params})
export const updateManufacturer = (manufacturerId, params) =>
  xanyahApi.patch(`manufacturers/${manufacturerId}`, params)

export const createManufacturer = (newManufacturer) =>
  xanyahApi.post('manufacturers', newManufacturer)


// Stores API Calls

export const getStores = () => xanyahApi.get('stores')
export const updateStore = (storeId, params) =>
  xanyahApi.patch(`stores/${storeId}`, params)


export const updateUserParams = params => xanyahApi.patch('auth', params)


export const getCategories = () => xanyahApi.get('categories')
