import {
  STORES_UPDATE_FIELD,
  STORES_UPDATE_STORE,
} from '../constants/actions'

import { formatStore } from '../types'
import { I18n } from 'react-redux-i18n'

import {
  updateStore as apiPatchStore,
} from '../utils/api-helper'

import {
  showErrorToast,
  showSuccessToast,
} from '../utils/notification-helper'

export const updateStoresField = (field, value) => ({
  field,
  type: STORES_UPDATE_FIELD,
  value,
})

export const updateStore = store => ({
  store,
  type: STORES_UPDATE_STORE,
})

export const updateApiStore = updatedStore =>
  (dispatch, currentState) => {
    const state = currentState()
    updatedStore = formatStore(updatedStore)
    apiPatchStore(state.stores.currentStore.id, updatedStore)
      .then(({ data }) => {
        dispatch(updateStore(data))
        showSuccessToast(I18n.t('toast.updated'))
      })
      .catch(e => showErrorToast(e))
  }
