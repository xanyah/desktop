import {
  CUSTOM_ATTRIBUTES_UPDATE_FIELD,
  CUSTOM_ATTRIBUTES_CREATE_CUSTOM_ATTRIBUTE,
  CUSTOM_ATTRIBUTES_UPDATE_CUSTOM_ATTRIBUTE,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  createCustomAttribute as apiPostCustomAttribute,
  getCustomAttributes as apiGetCustomAttributes,
  updateCustomAttribute as apiPatchCustomAttributeParams,
} from '../utils/api-helper'

import {
  formatCustomAttribute,
} from '../types'

import {
  showErrorToast,
  showSuccessToast,
} from '../utils/notification-helper'

export const updateCustomAttribute = customAttribute => ({
  customAttribute,
  type: CUSTOM_ATTRIBUTES_UPDATE_CUSTOM_ATTRIBUTE,
})

export const createCustomAttribute = customAttribute => ({
  customAttribute,
  type: CUSTOM_ATTRIBUTES_CREATE_CUSTOM_ATTRIBUTE,
})

export const updateCustomAttributesField = (field, value) => ({
  field,
  type: CUSTOM_ATTRIBUTES_UPDATE_FIELD,
  value,
})

export const getCustomAttributes = params =>
  (dispatch, currentState) => {
    const state = currentState()
    dispatch(updateCustomAttributesField('loading', true))
    apiGetCustomAttributes({ ...params, storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateCustomAttributesField('customAttributes', data))
        dispatch(updateCustomAttributesField('loading', false))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const updateApiCustomAttribute = updatedCustomAttribute =>
  dispatch => {
    updatedCustomAttribute = formatCustomAttribute(updatedCustomAttribute)
    dispatch(updateCustomAttributesField('loading', true))
    apiPatchCustomAttributeParams(
      updatedCustomAttribute.id,
      updatedCustomAttribute
    )
      .then(({ data }) => {
        dispatch(updateCustomAttributesField('loading', false))
        dispatch(updateCustomAttribute(data))
        showSuccessToast(I18n.t('toast.updated'))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const createApiCustomAttribute = newCustomAttribute =>
  (dispatch, currentState) => {
    const state = currentState()
    newCustomAttribute = formatCustomAttribute(newCustomAttribute)
    dispatch(updateCustomAttributesField('loading', true))
    apiPostCustomAttribute(
      {
        ...newCustomAttribute,
        storeId: state.stores.currentStore.id,
      })
      .then(({ data }) => {
        dispatch(updateCustomAttributesField('loading', false))
        dispatch(createCustomAttribute(data))
        showSuccessToast(I18n.t('toast.created', {entity: I18n.t('models.custom-attributes.title')}))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }
