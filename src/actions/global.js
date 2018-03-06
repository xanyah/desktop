import {
  GLOBAL_UPDATE_FIELD,
} from '../constants/actions'

import {
  getProviders,
  getStores,
} from '../utils/api-helper'

import {
  updateProviderField,
  updateStoresField,
} from './index'

export const updateGlobalField = (field, value) => ({
  field,
  type: GLOBAL_UPDATE_FIELD,
  value,
})

export const initialSync = () =>
  dispatch => {
    Promise.all([
      getProviders(),
      getStores(),
    ]).then(([ providersResponse, storesResponse ]) => {
      dispatch(updateProviderField('providers', providersResponse.data))
      dispatch(updateStoresField('stores', storesResponse.data))
      if (storesResponse.data.length > 0) {
        dispatch(updateStoresField('currentStore', storesResponse.data[0]))
      }
    })
  }
