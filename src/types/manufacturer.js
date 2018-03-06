import PropTypes from 'prop-types'

export const ManufacturerType = {
  id: PropTypes.string,
  name: PropTypes.string,
  notes: PropTypes.string,
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
    },
  ],
]

export const formatProvider = (manufacturer) => ({
  ...manufacturer,
  notes: manufacturer.notes.trim(),
})
