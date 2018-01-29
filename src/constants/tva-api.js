import axios from 'axios'

export const tvaApi = axios.create({
  baseURL: 'https://euvat.ga/api/',
  timeout: 5000,
})
