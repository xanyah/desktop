import { xanyahApi } from '../constants'

export const validateToken = () => xanyahApi.get('auth/validate_token')

export const signIn = params => xanyahApi.post('auth/sign_in', params)

export const getProviders = () => xanyahApi.get('providers')
