import {
  INVENTORIES_UPDATE_FIELD,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  getInventories as apiGetInventories,
} from '../utils/api-helper'

import {
  showErrorToast,
} from '../utils/notification-helper'

export const updateInventoriesField = (field, value) => ({
  field,
  type: INVENTORIES_UPDATE_FIELD,
  value,
})

export const getInventories = () =>
  (dispatch, currentState) => {
    const state = currentState()
    dispatch(updateInventoriesField('loading', true))
    apiGetInventories({ storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateInventoriesField('inventories', data))
        dispatch(updateInventoriesField('loading', false))
      })
      .catch({
        showErrorToast(I18n.t('toast.error'))
      })
  }
