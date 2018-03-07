import PropTypes from 'prop-types'

export const ManufacturerType = {
  created_at: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  notes: PropTypes.string,
  store_id: PropTypes.string,
  updated_at: PropTypes.string,
}

export const ManufacturerFormat = [
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
