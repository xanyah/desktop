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
  getOrders,
  getShippings,
} from '../utils/api-helper'

import {
  updateProviderField,
  updateStoresField,
  updateProductsField,
  updateInventoriesField,
  updateManufacturerField,
  updateCategoriesField,
  updateCustomAttributesField,
  updateOrderField,
  updateShippingField,
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
      getOrders(),
      getShippings(),
    ]).then(([
      providersResponse,
      storesResponse,
      productsResponse,
      inventoriesResponse,
      manufacturersResponses,
      categoriesResponses,
      customAttributesResponses,
      ordersResponses,
      shippingsResponses,
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
      dispatch(updateOrderField(
        'orders', ordersResponses.data
      ))
      dispatch(updateShippingField(
        'shippings', shippingsResponses.data
      ))
      if (storesResponse.data.length > 0) {
        dispatch(updateStoresField(
          'currentStore', storesResponse.data[0]
        ))
      }
    })
  }
