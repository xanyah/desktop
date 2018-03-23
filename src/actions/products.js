import {
  PRODUCTS_UPDATE_FIELD,
} from '../constants/actions'

import {
  getProducts as apiGetProducts,
} from '../utils/api-helper'

export const updateProductsField = (field, value) => ({
  field,
  type: PRODUCTS_UPDATE_FIELD,
  value,
})

export const getProducts = () =>
  (dispatch, currentState) => {
    const state = currentState()
    dispatch(updateProductsField('loading', true))
    apiGetProducts({ storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateProductsField('products', data))
        dispatch(updateProductsField('loading', false))
      })
  }
