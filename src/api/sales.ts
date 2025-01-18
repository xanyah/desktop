import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'


export const createSale = sale =>
  xanyahApi.post('sales', {sale})

export const getSales = params =>
  xanyahApi.get('sales', decamelizeKeys({params}))

export const getSale = id =>
  xanyahApi.get(`sales/${id}`)
