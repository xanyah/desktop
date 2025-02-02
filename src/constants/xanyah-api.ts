import axios from 'axios'
import {
  camelizeKeys,
  decamelizeKeys,
} from 'humps'

export const xanyahApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
})

xanyahApi.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = localStorage.getItem(`Xanyah:Bearer`)

    if (config.headers['Content-Type'] === 'application/json') {
      config.data = decamelizeKeys(config.data)
      config.params = decamelizeKeys(config.params)
    }

    return config
  },
  error => Promise.reject(error))

xanyahApi.interceptors.response.use(
  (response) => {
    response.data = camelizeKeys(response.data)
    return response
  },
  error => Promise.reject(error))
