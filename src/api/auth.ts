import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const validateToken = () =>
  xanyahApi.get<AuthToken>('auth/validate_token')

export const getCurrentUser = () =>
  xanyahApi.get('v2/current_user')

export const signIn = params =>
  xanyahApi.post<AuthToken>('oauth/token', decamelizeKeys(params))

export const updateUserParams = params =>
  xanyahApi.patch('v2/current_user', decamelizeKeys(params))
