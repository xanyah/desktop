import PropTypes from 'prop-types'

export const ProductType = {
  categoryId: PropTypes.string,
  createdAt: PropTypes.string,
  id: PropTypes.string,
  manufacturer: PropTypes.string,
  name: PropTypes.string,
  storeId: PropTypes.string,
  updatedAt: PropTypes.string,
}

export const productFormat = [
  [
    {
      attribute: 'name',
      editable: true,
      type: 'string',
    },
    {
      attribute: 'updatedAt',
      editable: false,
      type: 'date',
    },
  ],
  [
    {
      attribute: 'createdAt',
      editable: false,
      type: 'date',
    },
  ],
]
