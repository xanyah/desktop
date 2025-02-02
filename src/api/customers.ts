import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

export const getCustomers = params =>
  xanyahApi.get<Customer[]>('v2/customers', decamelizeKeys({ params }))

export const getCustomer = customerId =>
  xanyahApi.get<Customer>(`v2/customers/${customerId}`)

export const updateCustomer = (customerId, params) =>
  xanyahApi.patch<Customer>(`v2/customers/${customerId}`, decamelizeKeys(params))

export const createCustomer = newCustomer =>
  xanyahApi.post<Customer>('v2/customers', decamelizeKeys(newCustomer))
