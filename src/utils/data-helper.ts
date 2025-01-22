import moment from 'moment'

export const formatData = (data, column) => {
  if(isOfDateType(column)) {
    return moment(data).isValid()
      ? moment(data).format('llll')
      : data
  }

  if(isOfEntityType(column)) {
    return (data.name)
      ? data.name
      : data.id
  }

  return data
}

export const formatPrice = price => `${(price || 0).toFixed(2)} €`

const isOfDateType = attribute =>
  [
    'createdAt',
    'updatedAt',
    'lockedAt',
  ].includes(attribute)

export const isOfEntityType = attribute =>
  [
    'category',
    'client',
    'customAttribute',
    'inventory',
    'manufacturer',
    'product',
    'provider',
  ].includes(attribute)

export const getModel = entity => {
  switch(entity) {
  case 'category': return 'categories'
  case 'client': return 'clients'
  case 'customAttribute': return 'customAttributes'
  case 'inventory': return 'inventories'
  case 'manufacturer': return 'manufacturers'
  case 'product': return 'products'
  case 'provider': return 'providers'
  default: return null
  }
}

export const getSaleVariantsTotal = saleVariants =>
  saleVariants.reduce((a, b) =>
    b.saleVariantPromotion
      ? a + (b.saleVariantPromotion.type.calculatePrice(b.quantity * b.variant.price, b.saleVariantPromotion.amount || 0))
      : a + (b.quantity * b.variant.price), 0)

export const getSaleTotal = sale =>
  sale.salePromotion.type
    ? sale.salePromotion.type.calculatePrice(getSaleVariantsTotal(sale.saleVariants), sale.salePromotion.amount || 0)
    : getSaleVariantsTotal(sale.saleVariants)

export const getTypeOptions = () => [
  { label: 'String', value: 'text' },
  { label: 'Number', value: 'number' },
]
