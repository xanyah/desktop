import PropTypes from 'prop-types'

export const ManufacturerType = {
  createdAt: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  notes: PropTypes.string,
  productsCount: PropTypes.number,
  storeId: PropTypes.string,
  updatedAt: PropTypes.string,
}

export const manufacturerFormat = [
  [
    {
      attribute: 'name',
      editable: true,
      type: 'string',
    },
  ],
  [
    {
      attribute: 'productsCount',
      editable: false,
      type: 'number',
    },
    {
      attribute: 'createdAt',
      editable: false,
      type: 'date',
    },
  ],
  [
    {
      attribute: 'notes',
      editable: true,
      type: 'textarea',
    },
  ],
]

export const formatManufacturer = manufacturer => ({
  ...manufacturer,
  name: manufacturer.name.trim(),
  notes: manufacturer.notes.trim(),
})
