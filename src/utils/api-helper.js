import axios from 'axios'
import {
  camelizeKeys,
  decamelizeKeys,
} from 'humps'

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
})

instance.interceptors.request.use(config => {
  config.headers['access-token'] = localStorage.getItem('Xanyah:access-token')
  config.headers['token-type'] = localStorage.getItem('Xanyah:token-type')
  config.headers['client'] = localStorage.getItem('Xanyah:client')
  config.headers['expiry'] = localStorage.getItem('Xanyah:expiry')
  config.headers['uid'] = localStorage.getItem('Xanyah:uid')
  config.data = decamelizeKeys(config.data)
  return config
}, error => Promise.reject(error))

instance.interceptors.response.use(response => {
  if (response.headers['access-token']) {
    localStorage.setItem('Xanyah:access-token', response.headers['access-token'])
  }
  if (response.headers['token-type']) {
    localStorage.setItem('Xanyah:token-type', response.headers['token-type'])
  }
  if (response.headers['client']) {
    localStorage.setItem('Xanyah:client', response.headers['client'])
  }
  if (response.headers['expiry']) {
    localStorage.setItem('Xanyah:expiry', response.headers['expiry'])
  }
  if (response.headers['uid']) {
    localStorage.setItem('Xanyah:uid', response.headers['uid'])
  }
  response.data = camelizeKeys(response.data)
  return response
}, error => Promise.reject(error))


export const validateToken = () => instance.get('auth/validate_token')

export const signIn = params => instance.post('auth/sign_in', params)
