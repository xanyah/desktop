import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getPaymentTypes = params =>
  xanyahApi.get<PaymentType[]>('payment_types', { params: decamelizeKeys(params)})
