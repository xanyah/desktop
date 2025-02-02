import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getPaymentTypes = params =>
  xanyahApi.get<PaymentType[]>('v2/payment_types', { params: decamelizeKeys(params) })

export const getPaymentType = id =>
  xanyahApi.get<PaymentType>(`v2/payment_types/${id}`)

export const createPaymentType = params =>
  xanyahApi.post<PaymentType>('v2/payment_types', decamelizeKeys(params))

export const updatePaymentType = (id?: PaymentType['id'], params = {}) =>
  xanyahApi.patch<PaymentType>(`v2/payment_types/${id}`, decamelizeKeys(params))
