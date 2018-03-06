import {
  PROVIDERS_UPDATE_FIELD,
  PROVIDERS_UPDATE_PROVIDER,
} from '../constants/actions'

import {
  getProviders as apiGetProviders,
  updateProvider as apiPatchProviderParams,
} from '../utils/api-helper'

import { formatProvider } from '../types/provider'

export const updateProvider = provider => ({
  provider,
  type: PROVIDERS_UPDATE_PROVIDER,
})

export const updateProviderField = (field, value) => ({
  field,
  type: PROVIDERS_UPDATE_FIELD,
  value,
})

export const getProviders = () =>
  dispatch => {
    dispatch(updateProviderField('loading', true))
    apiGetProviders()
      .then(({ data }) => {
        dispatch(updateProviderField('providers', data))
        dispatch(updateProviderField('loading', false))
      })
  }

export const updateApiProvider = (id, params) =>
  dispatch => {
    params = formatProvider(params)
    dispatch(updateProviderField('loading', true))
    apiPatchProviderParams(id, params)
      .then(({ data }) => {
        dispatch(updateProviderField('loading', false))
        dispatch(updateProvider(data))
      })
  }
