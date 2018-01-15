import {
  PROVIDERS_UPDATE_FIELD,
} from '../constants/actions'

import { getProviders as apiGetProviders } from '../utils/api-helper'

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


