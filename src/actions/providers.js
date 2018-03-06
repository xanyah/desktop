import {
  PROVIDERS_UPDATE_FIELD,
  PROVIDERS_UPDATE_PROVIDER,
} from '../constants/actions'

import {
  getProviders as apiGetProviders,
  updateProvider as apiPatchProviderParams,
} from '../utils/api-helper'

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

export const getProviders = () =>
  dispatch => {
    dispatch(updateProviderField('loading', true))
    apiGetProviders()
      .then(({ data }) => {
        dispatch(updateProviderField('providers', data))
        dispatch(updateProviderField('loading', false))
      })
  }

export const updateApiProvider = newProvider =>
  dispatch => {
    newProvider = formatProvider(newProvider)
    dispatch(updateProviderField('loading', true))
    apiPatchProviderParams(newProvider.id, newProvider)
      .then(({ data }) => {
        dispatch(updateProviderField('loading', false))
        dispatch(updateProvider(data))
      })
  }
