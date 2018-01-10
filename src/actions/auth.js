import {
  AUTH_UPDATE_FIELD,
} from '../constants/actions'
import {
  signIn as apiSignIn,
} from '../utils/api-helper'

export const updateAuthField = (field, value) => ({
  type: AUTH_UPDATE_FIELD,
  field,
  value,
})

export const signIn = (email, password, successCallback = null) =>
  dispatch => {
    dispatch(updateAuthField('loading', true))
    apiSignIn({email, password})
      .then(() => {
        dispatch(updateAuthField('loading', false))
        dispatch(updateAuthField('signedIn', true))
        if (successCallback) {
          successCallback()
        }
      })
      .catch(r => {
        dispatch(updateAuthField('loading', false))
        dispatch(updateAuthField('errors', r.response.data.errors))
      })
  }
