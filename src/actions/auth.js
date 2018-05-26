import {
  AUTH_UPDATE_FIELD,
} from '../constants/actions'
import {
  signIn as apiSignIn,
  validateToken as apiValidateToken,
} from '../utils/api-helper'
import { initialSync, updateUserField } from './index'
import { setLocale } from 'react-redux-i18n'

export const updateAuthField = (field, value) => ({
  field,
  type: AUTH_UPDATE_FIELD,
  value,
})

export const signIn = (email, password, successCallback = null) =>
  dispatch => {
    dispatch(updateAuthField('loading', true))
    apiSignIn({email, password})
      .then(({data: { data } }) => {
        dispatch(updateAuthField('loading', false))
        dispatch(updateAuthField('signedIn', true))
        dispatch(updateUserField('email', data.email))
        dispatch(updateUserField('firstname', data.firstname))
        dispatch(updateUserField('lastname', data.lastname))
        dispatch(updateUserField('locale', data.locale))
        dispatch(setLocale(data.locale))
        dispatch(initialSync())
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
      .then(({data: { data } }) => {
        dispatch(updateAuthField('signedIn', true))
        dispatch(updateUserField('email', data.email))
        dispatch(updateUserField('firstname', data.firstname))
        dispatch(updateUserField('lastname', data.lastname))
        dispatch(updateUserField('locale', data.locale))
        dispatch(setLocale(data.locale))
        if (successCallback) {
          successCallback()
        }
      })
      .catch(() => {
        if (errorCallback) {
          errorCallback()
        }
      })
