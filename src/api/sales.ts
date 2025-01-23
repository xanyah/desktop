import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const createSale = sale =>
  xanyahApi.post<Sale>('sales', {sale})

export const getSales = params =>
  xanyahApi.get<Sale[]>('v2/sales', decamelizeKeys({params}))

export const getSale = id =>
  xanyahApi.get<Sale>(`sales/${id}`)
