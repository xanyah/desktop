import {
  PROVIDERS_UPDATE_FIELD,
  PROVIDERS_UPDATE_PROVIDER,
} from '../constants/actions'

import { I18n } from 'react-redux-i18n'

import {
  getProviders as apiGetProviders,
  updateProvider as apiPatchProviderParams,
  createProvider as apiPostProvider,
  searchProvider as apiSearchProvider,
} from '../utils/api-helper'

import {
  showSuccessToast,
  showErrorToast,
} from '../utils/notification-helper'

import { formatProvider } from '../types'

export const updateProvider = provider => ({
  provider,
  type: PROVIDERS_UPDATE_PROVIDER,
})

export const updateProviderField = (field, value) => ({
  field,
  type: PROVIDERS_UPDATE_FIELD,
  value,
})

export const getProviders = params =>
  (dispatch, currentState) => {
    const state = currentState()
    dispatch(updateProviderField('loading', true))
    apiGetProviders({ ...params, storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateProviderField('providers', data))
        dispatch(updateProviderField('loading', false))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const updateApiProvider = updatedProvider =>
  dispatch => {
    updatedProvider = formatProvider(updatedProvider)
    dispatch(updateProviderField('loading', true))
    apiPatchProviderParams(updatedProvider.id, updatedProvider)
      .then(({ data }) => {
        dispatch(updateProviderField('loading', false))
        dispatch(updateProvider(data))
        showSuccessToast(I18n.t('toast.updated'))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }

export const createApiProvider = newProvider =>
  (dispatch, currentState) => {
    const state = currentState()
    if(state && state.stores && state.stores.currentStore) {
      const storeId = state.stores.currentStore.id
      newProvider = formatProvider(newProvider)
      dispatch(updateProviderField('loading', true))
      apiPostProvider({...newProvider, storeId})
        .then(({ data }) => {
          dispatch(updateProviderField('loading', false))
          dispatch(updateProvider(data))
          showSuccessToast(I18n.t('toast.created'))
        })
        .catch(() => {
          showErrorToast(I18n.t('toast.error'))
        })
    }
  }

export const searchApiProvider = query =>
  (dispatch, currentState) => {
    const state = currentState()
    apiSearchProvider({ query: query, storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        //TODO Improve with loader ?
        dispatch(updateProviderField('providers', data))
      })
      .catch(() => {
        showErrorToast(I18n.t('toast.error'))
      })
  }
