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

export const formatPrice = data => parseFloat(data).toFixed(2)+' €'

export const isOfDateType = attribute =>
  [
    'createdAt',
    'updatedAt',
    'lockedAt',
  ].includes(attribute)

export const isOfEntityType = attribute =>
  [
    'category',
    'inventory',
    'manufacturer',
    'product',
    'provider',
  ].includes(attribute)

export const getModel = entity => {
  switch(entity) {
  case 'category': return 'categories'
  case 'inventory': return 'inventories'
  case 'manufacturer': return 'manufacturers'
  case 'product': return 'products'
  case 'provider': return 'providers'
  default: return null
  }
}
