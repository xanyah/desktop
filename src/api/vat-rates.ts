import { xanyahApi } from '../constants'

export const getAllVatRates = () => xanyahApi.get<VatRate[]>('vat_rates')

/** @deprecated */
export const getVatRates = countryCode =>
  xanyahApi.get<VatRate>(`vat_rates/${countryCode}`)
