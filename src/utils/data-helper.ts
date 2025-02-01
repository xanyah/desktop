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

export const getTypeOptions = () => [
  { label: 'String', value: 'text' },
  { label: 'Number', value: 'number' },
]
