import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getAllVatRates = () => xanyahApi.get('vat_rates')
export const getVatRates = countryCode =>
  xanyahApi.get(`vat_rates/${countryCode}`)
