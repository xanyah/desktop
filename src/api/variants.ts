import { decamelizeKeys } from 'humps'
import { xanyahApi } from '../constants'

export const getVariantAttributes = params =>
  xanyahApi.get('variant_attributes', decamelizeKeys({params}))
export const updateVariantAttribute = (variantAttributeId, params) =>
  xanyahApi.patch(`variant_attributes/${variantAttributeId}`, decamelizeKeys(params))
export const createVariantAttribute = newVariantAttribute =>
  xanyahApi.post('variant_attributes', decamelizeKeys(newVariantAttribute))

// Variants API Calls

export const getVariants = params =>
  xanyahApi.get('variants', decamelizeKeys({params}))
export const updateVariant = (variantId, params) =>
  xanyahApi.patch(`variants/${variantId}`, decamelizeKeys(params))
export const createVariant = newVariant =>
  xanyahApi.post('variants', decamelizeKeys(newVariant))
export const searchVariant = params =>
  xanyahApi.get('variants/search', decamelizeKeys({params}))


export const getVariantByBarcode = barcode => xanyahApi.get(`variants/${barcode}/by_barcode`)

export const getShippingVariants = params =>
  xanyahApi.get('shipping_variants', decamelizeKeys({params}))
