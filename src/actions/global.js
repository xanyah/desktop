import {
  GLOBAL_UPDATE_FIELD,
} from '../constants/actions'

import {
  getProviders,
  getStores,
  getProducts,
  getInventories,
  getManufacturers,
  getCategories,
  getCustomAttributes,
} from '../utils/api-helper'

import {
  updateProviderField,
  updateStoresField,
  updateProductsField,
  updateInventoriesField,
  updateManufacturerField,
  updateCategoriesField,
  updateCustomAttributesField,
} from './index'

export const updateGlobalField = (field, value) => ({
  field,
  type: GLOBAL_UPDATE_FIELD,
  value,
})

export const initialSync = () =>
  dispatch => {
    Promise.all([
      getProviders(),
      getStores(),
      getProducts(),
      getInventories(),
      getManufacturers(),
      getCategories(),
      getCustomAttributes(),
    ]).then(([
      providersResponse,
      storesResponse,
      productsResponse,
      inventoriesResponse,
      manufacturersResponses,
      categoriesResponses,
      customAttributesResponses,
    ]) => {
      dispatch(updateProviderField(
        'providers', providersResponse.data
      ))
      dispatch(updateStoresField(
        'stores', storesResponse.data
      ))
      dispatch(updateProductsField(
        'products', productsResponse.data
      ))
      dispatch(updateInventoriesField(
        'inventories', inventoriesResponse.data
      ))
      dispatch(updateManufacturerField(
        'manufacturers', manufacturersResponses.data
      ))
      dispatch(updateCategoriesField(
        'categories', categoriesResponses.data
      ))
      dispatch(updateCustomAttributesField(
        'customAttributes', customAttributesResponses.data
      ))
      if (storesResponse.data.length > 0) {
        dispatch(updateStoresField(
          'currentStore', storesResponse.data[0]
        ))
      }
    })
  }
