import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const validateToken = () =>
  xanyahApi.get('auth/validate_token')

export const signIn = params =>
  xanyahApi.post('auth/sign_in', decamelizeKeys(params))

// Clients API Calls

export const getClients = params =>
  xanyahApi.get('clients', decamelizeKeys({params}))
export const updateClient = (clientId, params) =>
  xanyahApi.patch(`clients/${clientId}`, decamelizeKeys(params))
export const createClient = newClient =>
  xanyahApi.post('clients', decamelizeKeys(newClient))
export const searchClient = params =>
  xanyahApi.get('clients/search', decamelizeKeys({params}))

// Custom Attributes API Calls

export const getCustomAttributes = params =>
  xanyahApi.get('custom_attributes', decamelizeKeys({params}))
export const updateCustomAttribute = (customAttributeId, params) =>
  xanyahApi.patch(`custom_attributes/${customAttributeId}`, decamelizeKeys(params))
export const createCustomAttribute = newCustomAttribute =>
  xanyahApi.post('custom_attributes', decamelizeKeys(newCustomAttribute))

// Variants Attributes API Calls

export const getVariantAttributes = params =>
  xanyahApi.get('variant_attributes', decamelizeKeys({params}))
export const updateVariantAttribute = (variantAttributeId, params) =>
  xanyahApi.patch(`variant_attributes/${variantAttributeId}`, decamelizeKeys(params))
export const createVariantAttribute = newVariantAttribute =>
  xanyahApi.post('variant_attributes', decamelizeKeys(newVariantAttribute))

// Variants API Calls

export const getVariants = params =>
  xanyahApi.get('variants', decamelizeKeys({params}))
export const updateVariant = (variantId, params) =>
  xanyahApi.patch(`variants/${variantId}`, decamelizeKeys(params))
export const createVariant = newVariant =>
  xanyahApi.post('variants', decamelizeKeys(newVariant))
export const searchVariant = params =>
  xanyahApi.get('variants/search', decamelizeKeys({params}))

// Products API Calls

export const getProducts = params =>
  xanyahApi.get('products', decamelizeKeys({params}))
export const updateProduct = (productId, params) =>
  xanyahApi.patch(`products/${productId}`, decamelizeKeys(params))
export const createProduct = newProduct =>
  xanyahApi.post('products', decamelizeKeys(newProduct))
export const searchProduct = params =>
  xanyahApi.get('products/search', decamelizeKeys({params}))

// Inventories API Calls

export const getInventories = params =>
  xanyahApi.get('inventories', decamelizeKeys({params}))

// Providers API Calls

export const getProviders = params =>
  xanyahApi.get('providers', decamelizeKeys({params}))
export const updateProvider = (providerId, params) =>
  xanyahApi.patch(`providers/${providerId}`, decamelizeKeys(params))
export const createProvider = newProvider =>
  xanyahApi.post('providers', decamelizeKeys(newProvider))
export const searchProvider = params =>
  xanyahApi.get('providers/search', decamelizeKeys({params}))

// Manufacturers API Calls

export const getManufacturers = params =>
  xanyahApi.get('manufacturers', decamelizeKeys({params}))
export const updateManufacturer = (manufacturerId, params) =>
  xanyahApi.patch(`manufacturers/${manufacturerId}`, decamelizeKeys(params))
export const createManufacturer = newManufacturer =>
  xanyahApi.post('manufacturers', decamelizeKeys(newManufacturer))
export const searchManufacturer = params =>
  xanyahApi.get('manufacturers/search', decamelizeKeys({params}))

// Stores API Calls

export const getStores = params =>
  xanyahApi.get('stores', decamelizeKeys({params}))
export const updateStore = (storeId, params) =>
  xanyahApi.patch(`stores/${storeId}`, decamelizeKeys(params))

// Users API Calls

export const updateUserParams = params =>
  xanyahApi.patch('auth', decamelizeKeys(params))

// Categories API Calls

export const getCategories = params =>
  xanyahApi.get('categories', decamelizeKeys({params}))
export const updateCategory = (categoryId, params) =>
  xanyahApi.patch(`categories/${categoryId}`, decamelizeKeys(params))
export const createCategory = newCategory =>
  xanyahApi.post('categories', decamelizeKeys(newCategory))
