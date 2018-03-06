import PropTypes from 'prop-types'

export const ManufacturerType = {
  id: PropTypes.string,
  name: PropTypes.string,
  notes: PropTypes.string,
}

export const ManufacturerFormat = {
  currentEntity:ManufacturerType,
  editing:PropTypes.bool,
  formattedData:PropTypes.object,
  toggleEdit:PropTypes.func,
  type:'manufacturers',
  updateEntity:PropTypes.func,
}

export const formatManufacturer = (manufacturer) => {
  return Object.assign({}, manufacturer, {
    notes: manufacturer.notes.trim(),
  })
}
