import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const getPaymentTypes = params => xanyahApi.get('payment_types', { params: decamelizeKeys(params)})
