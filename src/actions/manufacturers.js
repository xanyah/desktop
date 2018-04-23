import {
  MANUFACTURERS_UPDATE_MANUFACTURER,
  MANUFACTURERS_UPDATE_FIELD,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  getManufacturers as apiGetManufacturers,
  updateManufacturer as apiPatchManufacturerParams,
  createManufacturer as apiPostManufacturer,
  searchManufacturer as apiSearchManufacturer,
} from '../utils/api-helper'

import {
  showSuccessToast,
  showErrorToast,
} from '../utils/notification-helper'

import { formatManufacturer } from '../types'

export const updateManufacturer = manufacturer => ({
  manufacturer,
  type: MANUFACTURERS_UPDATE_MANUFACTURER,
})

export const updateManufacturerField = (field, value) => ({
  field,
  type: MANUFACTURERS_UPDATE_FIELD,
  value,
})

export const getManufacturers = () =>
  (dispatch, currentState) => {
    const state = currentState()
    dispatch(updateManufacturerField('loading', true))
    apiGetManufacturers({ storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateManufacturerField('manufacturers', data))
        dispatch(updateManufacturerField('loading', false))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const updateApiManufacturer = updatedManufacturer =>
  dispatch => {
    updatedManufacturer = formatManufacturer(updatedManufacturer)
    dispatch(updateManufacturerField('loading', true))
    apiPatchManufacturerParams(updatedManufacturer.id, updatedManufacturer)
      .then(({ data }) => {
        dispatch(updateManufacturerField('loading', false))
        dispatch(updateManufacturer(data))
        showSuccessToast(I18n.t('toast.updated'))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const createApiManufacturer = newManufacturer =>
  (dispatch, currentState) => {
    const state = currentState()

    if(state && state.stores && state.stores.currentStore) {
      const storeId = state.stores.currentStore.id
      newManufacturer = formatManufacturer(newManufacturer)
      dispatch(updateManufacturerField('loading', true))
      apiPostManufacturer({...newManufacturer, storeId})
        .then(({ data }) => {
          dispatch(updateManufacturerField('loading', false))
          dispatch(updateManufacturer(data))
          showSuccessToast(I18n.t('toast.created'))
        })
        .catch(() => {
          showErrorToast(I18n.t('toast.error'))
        })
    }
  }

export const searchApiManufacturer = query =>
  (dispatch, currentState) => {
    const state = currentState()
    apiSearchManufacturer(
      {
        query: query,
        storeId: state.stores.currentStore.id,
      })
      .then(({ data }) => {
        //TODO Improve with loader ?
        dispatch(updateManufacturerField('manufacturers', data))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }
