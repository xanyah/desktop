import { xanyahApi } from '../constants'

export const createSale = sale =>
  xanyahApi.post('sales', {sale})
// Variants API Calls

export const getVariantByBarcode = barcode => xanyahApi.get(`variants/${barcode}/by_barcode`)
