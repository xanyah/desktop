import PropTypes from 'prop-types'

export const ProviderType = {
  createdAt: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  notes: PropTypes.string,
  storeId: PropTypes.string,
  updatedAt: PropTypes.string,
}

export const providerFormat = [
  [
    {
      attribute: 'name',
      editable: true,
      type: 'string',
    },
    {
      attribute: 'notes',
      editable: true,
      type: 'textarea',
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

export const formatProvider = (provider) => ({
  ...provider,
  name: provider.name.trim(),
  notes: provider.notes.trim(),
})
