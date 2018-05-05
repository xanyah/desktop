import {
  ORDERS_UPDATE_FIELD,
  ORDERS_UPDATE_ORDER,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  getOrders as apiGetOrders,
  updateOrder as apiPatchOrderParams,
  createOrder as apiPostOrder,
  searchOrder as apiSearchOrder,
} from '../utils/api-helper'

import {
  showSuccessToast,
  showErrorToast,
} from '../utils/notification-helper'

import { formatOrder } from '../types'

export const updateOrder = order => ({
  order,
  type: ORDERS_UPDATE_ORDER,
})

export const updateOrderField = (field, value) => ({
  field,
  type: ORDERS_UPDATE_FIELD,
  value,
})

export const getOrders = params =>
  (dispatch, currentState) => {
    const state = currentState()
    dispatch(updateOrderField('loading', true))
    apiGetOrders({ ...params, storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateOrderField('orders', data))
        dispatch(updateOrderField('loading', false))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const updateApiOrder = updatedOrder =>
  dispatch => {
    updatedOrder = formatOrder(updatedOrder)
    dispatch(updateOrderField('loading', true))
    apiPatchOrderParams(updatedOrder.id, updatedOrder)
      .then(({ data }) => {
        dispatch(updateOrderField('loading', false))
        dispatch(updateOrder(data))
        showSuccessToast(I18n.t('toast.updated'))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const createApiOrder = newOrder =>
  (dispatch, currentState) => {
    const state = currentState()
    if(state && state.stores && state.stores.currentStore) {
      const storeId = state.stores.currentStore.id
      newOrder = formatOrder(newOrder)
      dispatch(updateOrderField('loading', true))
      apiPostOrder({...newOrder, storeId})
        .then(({ data }) => {
          dispatch(updateOrderField('loading', false))
          dispatch(updateOrder(data))
          showSuccessToast(I18n.t('toast.created', {entity: I18n.t('models.orders.title')}))
        })
        .catch(() => {
          showErrorToast(I18n.t('toast.error'))
        })
    }
  }

export const searchApiOrder = query =>
  (dispatch, currentState) => {
    const state = currentState()
    apiSearchOrder({ query: query, storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateOrderField('orders', data))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }
