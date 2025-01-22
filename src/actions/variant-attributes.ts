import {
  PRODUCTS_CREATE_VARIANT_ATTRIBUTE,
  PRODUCTS_UPDATE_VARIANT_ATTRIBUTE,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  createVariantAttribute as apiPostVariantAttribute,
  updateVariantAttribute as apiPatchVariantAttributeParams,
} from '../utils/api-helper'

import {
  formatVariantAttribute,
} from '../types'

import {
  showErrorToast,
  showSuccessToast,
} from '../utils/notification-helper'

import { updateProductsField } from './index'

export const createvariantAttribute = variantAttribute => ({
  type: PRODUCTS_CREATE_VARIANT_ATTRIBUTE,
  variantAttribute,
})

export const updatevariantAttribute = variantAttribute => ({
  type: PRODUCTS_UPDATE_VARIANT_ATTRIBUTE,
  variantAttribute,
})

export const updateApiVariantAttribute = updatedVariantAttribute =>
  dispatch => {
    updatedVariantAttribute = formatVariantAttribute(updatedVariantAttribute)
    dispatch(updateProductsField('loading', true))
    apiPatchVariantAttributeParams(
      updatedVariantAttribute.id,
      updatedVariantAttribute,
    )
      .then(({ data }) => {
        dispatch(updateProductsField('loading', false))
        dispatch(updatevariantAttribute(data))
        showSuccessToast(I18n.t('toast.updated'))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const createApiVariantAttribute = newVariantAttribute =>
  (dispatch, currentState) => {
    const state = currentState()
    newVariantAttribute = formatVariantAttribute(newVariantAttribute)
    dispatch(updateProductsField('loading', true))
    apiPostVariantAttribute(
      {
        ...newVariantAttribute,
        storeId: state.stores.currentStore.id,
      })
      .then(({ data }) => {
        dispatch(updateProductsField('loading', false))
        dispatch(createvariantAttribute(data))
        showSuccessToast(I18n.t('toast.created', {entity: I18n.t('models.variant-attributes.title')}))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }
