import {
  PRODUCTS_UPDATE_FIELD,
  PRODUCTS_UPDATE_PRODUCT,
  PRODUCTS_UPDATE_VARIANT,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  getProducts as apiGetProducts,
  getVariants as apiGetVariants,
  createVariant as apiPostVariant,
  updateVariant as apiPatchVariantParams,
  updateProduct as apiPatchProductParams,
} from '../utils/api-helper'

import {
  formatProduct,
  formatVariant,
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

export const updateVariant = variant => ({
  type: PRODUCTS_UPDATE_VARIANT,
  variant,
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

export const getVariants = (productId) =>
  (dispatch) => {
    dispatch(updateProductsField('loading', true))
    apiGetVariants({ product_id: productId })
      .then(({ data }) => {
        dispatch(updateProductsField('variants', data))
        dispatch(updateProductsField('loading', false))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const createApiVariant = newVariant =>
  (dispatch) => {
    newVariant = formatVariant(newVariant)
    dispatch(updateProductsField('loading', true))
    apiPostVariant({...newVariant})
      .then(({ data }) => {
        dispatch(updateProductsField('loading', false))
        dispatch(updateVariant(data))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const updateApiVariant = updatedVariant =>
  dispatch => {
    updatedVariant = formatVariant(updatedVariant)
    dispatch(updateProductsField('loading', true))
    apiPatchVariantParams(updatedVariant.id, updatedVariant)
      .then(({ data }) => {
        dispatch(updateProductsField('loading', false))
        dispatch(updateVariant(data))
        showSuccessToast(I18n.t('toast.updated'))
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
  }
