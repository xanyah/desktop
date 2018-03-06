import PropTypes from 'prop-types'

export const ProviderType = {
  id: PropTypes.string,
  name: PropTypes.string,
  notes: PropTypes.string,
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
    },
  ],
]

export const formatProvider = (provider) => ({
  ...provider,
  notes: provider.notes.trim(),
})
