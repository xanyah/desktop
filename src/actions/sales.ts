import {
  SALES_UPDATE_FIELD,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  getSales as apiGetSales,
} from '../utils/api-helper'

import {
  showErrorToast,
} from '../utils/notification-helper'

export const updateSaleField = (field, value) => ({
  field,
  type: SALES_UPDATE_FIELD,
  value,
})

export const getSales = params =>
  (dispatch, currentState) => {
    const state = currentState()
    dispatch(updateSaleField('loading', true))
    apiGetSales({ ...params, storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateSaleField('sales', data))
        dispatch(updateSaleField('loading', false))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }
