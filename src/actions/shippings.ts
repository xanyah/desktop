import {
  SHIPPINGS_UPDATE_FIELD,
  SHIPPINGS_UPDATE_SHIPPING,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  getShippings as apiGetShippings,
  updateShipping as apiPatchShippingParams,
  createShipping as apiPostShipping,
} from '../utils/api-helper'

import {
  showSuccessToast,
  showErrorToast,
} from '../utils/notification-helper'

import { formatShipping } from '../types'

export const updateShipping = shipping => ({
  shipping,
  type: SHIPPINGS_UPDATE_SHIPPING,
})

export const updateShippingField = (field, value) => ({
  field,
  type: SHIPPINGS_UPDATE_FIELD,
  value,
})

export const getShippings = params =>
  (dispatch, currentState) => {
    const state = currentState()
    dispatch(updateShippingField('loading', true))
    apiGetShippings({ ...params, storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateShippingField('shippings', data))
        dispatch(updateShippingField('loading', false))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const updateApiShipping = updatedShipping =>
  dispatch => {
    updatedShipping = formatShipping(updatedShipping)
    dispatch(updateShippingField('loading', true))
    apiPatchShippingParams(updatedShipping.id, updatedShipping)
      .then(({ data }) => {
        dispatch(updateShippingField('loading', false))
        dispatch(updateShipping(data))
        showSuccessToast(I18n.t('toast.updated'))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const createApiShipping = newShipping =>
  (dispatch, currentState) => {
    const state = currentState()
    if(state && state.stores && state.stores.currentStore) {
      const storeId = state.stores.currentStore.id
      newShipping = formatShipping(newShipping)
      dispatch(updateShippingField('loading', true))
      apiPostShipping({...newShipping, storeId})
        .then(({ data }) => {
          dispatch(updateShippingField('loading', false))
          dispatch(updateShipping(data))
          showSuccessToast(I18n.t('toast.created', {entity: I18n.t('models.shippings.title')}))
        })
        .catch(() => {
          showErrorToast(I18n.t('toast.error'))
        })
    }
  }
