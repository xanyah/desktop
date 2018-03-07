import {
  STORES_UPDATE_FIELD,
  STORES_UPDATE_STORE,
} from '../constants/actions'

import { formatStore } from '../types'

import {
  updateStore as updateApiStore,
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

export const updateSingleStore = store => ({
  store,
  type: STORES_UPDATE_STORE,
})


export const updateStore = newStore =>
  dispatch => {
    newStore = formatStore(newStore)
    updateApiStore(newStore.id, newStore)
      .then(({ data }) => {
        dispatch(updateSingleStore(data))
        // TODO: i18n
        showSuccessToast('Updated')
      })
      .catch(e => showErrorToast(e))
  }
