import {
  AUTH_UPDATE_FIELD,
} from '../constants/actions'
import {
  signIn as apiSignIn,
  validateToken as apiValidateToken,
} from '../utils/api-helper'
import { updateUserField } from './index'

export const updateAuthField = (field, value) => ({
  field,
  type: AUTH_UPDATE_FIELD,
  value,
})

export const signIn = (email, password, successCallback = null) =>
  dispatch => {
    dispatch(updateAuthField('loading', true))
    apiSignIn({email, password})
      .then(({ data }) => {
        dispatch(updateAuthField('loading', false))
        dispatch(updateAuthField('signedIn', true))
        dispatch(updateUserField('email', data.data.email))
        dispatch(updateUserField('firstname', data.data.firstname))
        dispatch(updateUserField('lastname', data.data.lastname))
        if (successCallback) {
          successCallback()
        }
      })
      .catch(r => {
        dispatch(updateAuthField('loading', false))
        dispatch(updateAuthField('errors', r.response.data.errors))
      })
  }

export const validateToken = (successCallback = null, errorCallback = null) =>
  dispatch =>
    apiValidateToken()
      .then(({ data }) => {
        dispatch(updateAuthField('signedIn', true))
        dispatch(updateUserField('email', data.data.email))
        dispatch(updateUserField('firstname', data.data.firstname))
        dispatch(updateUserField('lastname', data.data.lastname))
        if (successCallback) {
          successCallback()
        }
      })
      .catch(() => {
        if (errorCallback) {
          errorCallback()
        }
      })
