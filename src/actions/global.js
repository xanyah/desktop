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
    ]).then(data => {
      dispatch(updateProviderField('providers', data[0].data))
      dispatch(updateStoresField('stores', data[1].data))
      if (data[1].data.length > 0) {
        dispatch(updateStoresField('currentStore', data[1].data[0]))
      }
    })
  }
