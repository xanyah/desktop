import { decamelizeKeys } from 'humps'
import { xanyahApi } from '../constants'

export const getCountries = params =>
  xanyahApi.get<Country[]>('v2/countries', decamelizeKeys({ params }))

export const getCountry = id =>
  xanyahApi.get<Country>(`v2/countries/${id}`)
