import {
  PRODUCTS_CREATE_PRODUCT,
  PRODUCTS_UPDATE_FIELD,
  PRODUCTS_UPDATE_PRODUCT,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  getProducts as apiGetProducts,
  updateProduct as apiPatchProductParams,
  searchProduct as apiSearchProduct,
  createProduct as apiPostProduct,
} from '../utils/api-helper'

import { createApiVariant } from './'

import { formatProduct, formatVariant } from '../types'

import {
  showErrorToast,
  showSuccessToast,
} from '../utils/notification-helper'

export const createProduct = product => ({
  product,
  type: PRODUCTS_CREATE_PRODUCT,
})


export const updateProduct = product => ({
  product,
  type: PRODUCTS_UPDATE_PRODUCT,
})

export const updateProductsField = (field, value) => ({
  field,
  type: PRODUCTS_UPDATE_FIELD,
  value,
})

export const getProducts = params =>
  (dispatch, currentState) => {
    const state = currentState()
    dispatch(updateProductsField('loading', true))
    apiGetProducts({ ...params, storeId: state.stores.currentStore.id })
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

export const createApiProduct = (newProduct, newVariant) =>
  (dispatch, currentState) => {
    const state = currentState()
    if(state && state.stores && state.stores.currentStore) {
      const storeId = state.stores.currentStore.id
      newProduct = formatProduct(newProduct)
      newVariant = formatVariant(newVariant)
      dispatch(updateProductsField('loading', true))
      apiPostProduct({
        'product': {...newProduct, storeId},
        'variant': newVariant,
      })
        .then(({ data }) => {
          dispatch(updateProductsField('loading', false))
          dispatch(updateProduct(data))
          createApiVariant({...newVariant, productId: data.id}, true)
          showSuccessToast(I18n.t('toast.created', {entity: I18n.t('models.products.title')}))
        })
        .catch(() => {
          showErrorToast(I18n.t('toast.error'))
        })
    }
  }

export const searchApiProduct = query =>
  (dispatch, currentState) => {
    const state = currentState()
    apiSearchProduct({query: query, storeId: state.stores.currentStore.id})
      .then(({ data }) => {
        dispatch(updateProductsField('products', data))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }
