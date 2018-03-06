import PropTypes from 'prop-types'

export const ProviderType = {
  id: PropTypes.string,
  name: PropTypes.string,
  notes: PropTypes.string,
}

export const ProviderFormat = {
  currentEntity:ProviderType,
  editing:PropTypes.bool,
  formattedData:PropTypes.object,
  toggleEdit:PropTypes.func,
  type:'providers',
  updateEntity:PropTypes.func,
}

export const formatProvider = (provider) => {
  return Object.assign({}, provider, {
    notes: provider.notes.trim(),
  })
}
