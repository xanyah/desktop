import PropTypes from 'prop-types'

export const VariantAttributeType = {
  createdAt: PropTypes.string,
  customAttributeId: PropTypes.string,
  id: PropTypes.string,
  updatedAt: PropTypes.string,
  value: PropTypes.string,
  variantId: PropTypes.string,
}

export const variantAttributeFormat = [
  [
    {
      attribute: 'customAttribute',
      editable: false,
      type: 'entity',
    },
    {
      attribute: 'value',
      editable: true,
      type: 'string',
    },
  ],
]

export const formatVariantAttribute = (variantAttribute) => ({
  ...variantAttribute,
  customAttributeId: (variantAttribute.customAttributeId)
    ? variantAttribute.customAttributeId
    : variantAttribute.customAttribute.id,
})
