import PropTypes from 'prop-types'

export const CustomAttributeType = {
  created_at: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  store_id: PropTypes.string,
  type: PropTypes.string,
  updated_at: PropTypes.string,
}

export const customAttributeFormat = [
  [
    {
      attribute: 'name',
      editable: true,
      type: 'string',
    },
    {
      attribute: 'type',
      editable: true,
      type: 'type',
    },
  ],
]

export const formatCustomAttribute = (customAttribute) => ({
  ...customAttribute,
})
