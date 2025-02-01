import PropTypes from 'prop-types'
import { ManufacturerType } from './manufacturer'

export const ProductType = {
  categoryId: PropTypes.string,
  createdAt: PropTypes.string,
  id: PropTypes.string,
  manufacturer: PropTypes.objectOf(ManufacturerType),
  name: PropTypes.string,
  storeId: PropTypes.string,
  updatedAt: PropTypes.string,
}

export const formatProduct = product => ({
  ...product,
  categoryId: product.category.id,
  manufacturerId: product.manufacturer.id,
  name: product.name.trim(),
})

export const productFormat = [
  [
    {
      attribute: 'name',
      editable: true,
      type: 'string',
    },
  ],
  [
    {
      attribute: 'category',
      editable: true,
      type: 'entity',
    },
    {
      attribute: 'manufacturer',
      editable: true,
      type: 'entity',
    },
  ],
  [
    {
      attribute: 'createdAt',
      editable: false,
      type: 'date',
    },
    {
      attribute: 'updatedAt',
      editable: false,
      type: 'date',
    },
  ],
]
