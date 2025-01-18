import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const validateToken = () =>
  xanyahApi.get('auth/validate_token')

export const signIn = params =>
  xanyahApi.post('auth/sign_in', decamelizeKeys(params))

export const updateUserParams = params =>
  xanyahApi.patch('auth', decamelizeKeys(params))
