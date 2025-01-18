import { xanyahApi } from '../constants'

export const getAllVatRates = () => xanyahApi.get('vat_rates')
export const getVatRates = countryCode =>
  xanyahApi.get(`vat_rates/${countryCode}`)
