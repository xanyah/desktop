import PropTypes from 'prop-types'

export const ManufacturerType = {
  createdAt: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  notes: PropTypes.string,
  storeId: PropTypes.string,
  updatedAt: PropTypes.string,
}

export const manufacturerFormat = [
  [
    {
      attribute: 'notes',
      editable: true,
      type: 'textarea',
    },
    {
      attribute: 'createdAt',
      editable: false,
      type: 'date',
    },
  ],
]

export const formatManufacturer = (manufacturer) => ({
  ...manufacturer,
  name: manufacturer.name.trim(),
  notes: manufacturer.notes.trim(),
})
