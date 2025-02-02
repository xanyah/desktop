import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getPaymentTypes = params =>
  xanyahApi.get<PaymentType[]>('v2/payment_types', { params: decamelizeKeys(params) })

export const getPaymentType = id =>
  xanyahApi.get<PaymentType>(`v2/payment_types/${id}`)
