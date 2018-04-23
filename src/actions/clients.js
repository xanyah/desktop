import {
  CLIENTS_UPDATE_CLIENT,
  CLIENTS_UPDATE_FIELD,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  getClients as apiGetClients,
  updateClient as apiPatchClientParams,
  createClient as apiPostClient,
  searchClient as apiSearchClient,
} from '../utils/api-helper'

import {
  showSuccessToast,
  showErrorToast,
} from '../utils/notification-helper'

import { formatClient } from '../types'

export const updateClient = client => ({
  client,
  type: CLIENTS_UPDATE_CLIENT,
})

export const updateClientField = (field, value) => ({
  field,
  type: CLIENTS_UPDATE_FIELD,
  value,
})

export const getClients = params =>
  (dispatch, currentState) => {
    const state = currentState()
    dispatch(updateClientField('loading', true))
    apiGetClients({ ...params, storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateClientField('clients', data))
        dispatch(updateClientField('loading', false))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const updateApiClient = updatedClient =>
  dispatch => {
    updatedClient = formatClient(updatedClient)
    dispatch(updateClientField('loading', true))
    apiPatchClientParams(updatedClient.id, updatedClient)
      .then(({ data }) => {
        dispatch(updateClientField('loading', false))
        dispatch(updateClient(data))
        showSuccessToast(I18n.t('toast.updated'))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const createApiClient = newClient =>
  (dispatch, currentState) => {
    const state = currentState()

    if(state && state.stores && state.stores.currentStore) {
      const storeId = state.stores.currentStore.id
      newClient = formatClient(newClient)
      dispatch(updateClientField('loading', true))
      apiPostClient({...newClient, storeId})
        .then(({ data }) => {
          dispatch(updateClientField('loading', false))
          dispatch(updateClient(data))
          showSuccessToast(I18n.t('toast.created'))
        })
        .catch(() => {
          showErrorToast(I18n.t('toast.error'))
        })
    }
  }

export const searchApiClient = query =>
  (dispatch, currentState) => {
    const state = currentState()
    apiSearchClient(
      {
        query: query,
        storeId: state.stores.currentStore.id,
      })
      .then(({ data }) => {
        //TODO Improve with loader ?
        dispatch(updateClientField('clients', data))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }
