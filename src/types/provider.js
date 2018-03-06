import PropTypes from 'prop-types'

export const ProviderType = {
  created_at: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  notes: PropTypes.string,
  store_id: PropTypes.string,
  updated_at: PropTypes.string,
}

export const ProviderFormat = [
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

export const formatProvider = (provider) => ({
  ...provider,
  name: provider.name.trim(),
  notes: provider.notes.trim(),
})
