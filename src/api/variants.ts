import { decamelizeKeys } from 'humps'
import { xanyahApi } from '../constants'

export const getVariantAttributes = params =>
  xanyahApi.get<VariantAttribute[]>('variant_attributes', decamelizeKeys({params}))

export const updateVariantAttribute = (variantAttributeId, params) =>
  xanyahApi.patch<VariantAttribute>(`variant_attributes/${variantAttributeId}`, decamelizeKeys(params))

export const createVariantAttribute = newVariantAttribute =>
  xanyahApi.post<VariantAttribute>('variant_attributes', decamelizeKeys(newVariantAttribute))

// Variants API Calls

export const getVariants = params =>
  xanyahApi.get<Variant[]>('variants', decamelizeKeys({params}))

export const updateVariant = (variantId, params) =>
  xanyahApi.patch<Variant>(`variants/${variantId}`, decamelizeKeys(params))

export const createVariant = newVariant =>
  xanyahApi.post<Variant>('variants', decamelizeKeys(newVariant))

/** @deprecated */
export const searchVariant = params =>
  xanyahApi.get<Variant>('variants/search', decamelizeKeys({params}))


export const getVariantByBarcode = barcode => xanyahApi.get<Variant>(`variants/${barcode}/by_barcode`)
