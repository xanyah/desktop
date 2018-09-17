import axios from 'axios'
import {
  camelizeKeys,
  decamelizeKeys,
} from 'humps'

const authHeaders = [
  'access-token',
  'client',
  'expiry',
  'token-type',
  'uid',
]

export const xanyahApi = axios.create({
  baseURL: 'https://xanyah-staging.herokuapp.com/',
  timeout: 5000,
})

xanyahApi.interceptors.request.use(
  config => {
    authHeaders.forEach(key =>
      config.headers[key] = localStorage.getItem(`Xanyah:${key}`))

    if (config.headers['Content-Type'] === 'application/json') {
      config.data = decamelizeKeys(config.data)
      config.params = decamelizeKeys(config.params)
    }

    return config
  },
  error => Promise.reject(error))

xanyahApi.interceptors.response.use(
  response => {
    authHeaders.forEach(key => {
      if (response.headers[key]) {
        localStorage.setItem(`Xanyah:${key}`, response.headers[key])
      }
    })
    response.data = camelizeKeys(response.data)
    return response
  },
  error => Promise.reject(error))
