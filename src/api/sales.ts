import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const createSale = sale =>
  xanyahApi.post<Sale>('sales', {sale})

export const getSales = params =>
  xanyahApi.get<Sale[]>('v2/sales', decamelizeKeys({params}))

export const getSale = id =>
  xanyahApi.get<Sale>(`v2/sales/${id}`)

export const getSaleProducts = params =>
  xanyahApi.get<SaleProduct[]>('v2/sale_products', decamelizeKeys({params}))

export const getSalePayments = params =>
  xanyahApi.get<SalePayment[]>('v2/sale_payments', decamelizeKeys({params}))
