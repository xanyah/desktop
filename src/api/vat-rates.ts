import { decamelizeKeys } from 'humps'
import { xanyahApi } from '../constants'

export const getVatRates = params =>
  xanyahApi.get<VatRate[]>('v2/vat_rates', decamelizeKeys({ params }))

export const getVatRate = id =>
  xanyahApi.get<VatRate>(`v2/vat_rates/${id}`)
