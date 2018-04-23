import {
  PRODUCTS_UPDATE_FIELD,
  PRODUCTS_UPDATE_PRODUCT,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  getProducts as apiGetProducts,
  updateProduct as apiPatchProductParams,
  searchProduct as apiSearchProduct,
} from '../utils/api-helper'

import {
  formatProduct,
} from '../types'

import {
  showErrorToast,
  showSuccessToast,
} from '../utils/notification-helper'

export const updateProduct = product => ({
  product,
  type: PRODUCTS_UPDATE_PRODUCT,
})

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
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const updateApiProduct = updatedProduct =>
  dispatch => {
    updatedProduct = formatProduct(updatedProduct)
    dispatch(updateProductsField('loading', true))
    apiPatchProductParams(updatedProduct.id, updatedProduct)
      .then(({ data }) => {
        dispatch(updateProductsField('loading', false))
        dispatch(updateProduct(data))
        showSuccessToast(I18n.t('toast.updated'))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const searchApiProduct = query =>
  (dispatch, currentState) => {
    const state = currentState()
    apiSearchProduct({ query: query, storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        //TODO Improve with loader ?
        dispatch(updateProductsField('products', data))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }
