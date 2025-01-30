import { xanyahApi } from '../constants'
import { decamelizeKeys } from 'humps'

// Custom Attributes API Calls

export const getCustomAttributes = params =>
  xanyahApi.get('custom_attributes', decamelizeKeys({params}))

// Inventories API Calls

export const getInventories = params =>
  xanyahApi.get('inventories', decamelizeKeys({params}))

// Sales API Calls

export const createSale = sale =>
  xanyahApi.post('sales', {sale})
// Variants API Calls

export const getVariantByBarcode = barcode => xanyahApi.get(`variants/${barcode}/by_barcode`)
