import {
  PRODUCTS_CREATE_VARIANT,
  PRODUCTS_UPDATE_VARIANT,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  getVariants as apiGetVariants,
  createVariant as apiPostVariant,
  updateVariant as apiPatchVariantParams,
} from '../utils/api-helper'

import {
  formatVariant,
} from '../types'

import {
  showErrorToast,
  showSuccessToast,
} from '../utils/notification-helper'

import { updateProductsField } from './index'

export const updateVariant = variant => ({
  type: PRODUCTS_UPDATE_VARIANT,
  variant,
})

export const createVariant = variant => ({
  type: PRODUCTS_CREATE_VARIANT,
  variant,
})

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
        dispatch(createVariant(data))
        showSuccessToast(I18n.t('toast.created'))
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
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }
