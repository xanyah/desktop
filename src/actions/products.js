import {
  PRODUCTS_UPDATE_FIELD,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  getProducts as apiGetProducts,
  getVariants as apiGetVariants,
} from '../utils/api-helper'

import {
  showErrorToast,
} from '../utils/notification-helper'

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

export const getVariants = (productId) =>
  (dispatch) => {
    dispatch(updateProductsField('loading', true))
    apiGetVariants({ product_id: productId })
      .then(({ data }) => {
        console.log(data)
        dispatch(updateProductsField('variants', data))
        dispatch(updateProductsField('loading', false))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }
