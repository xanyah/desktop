import PropTypes from 'prop-types'

export const ShippingType = {
  createdAt: PropTypes.string,
  id: PropTypes.string,
  lockedAt: PropTypes.string,
  provider: PropTypes.object,
  shippingVariantsCount: PropTypes.number,
  updatedAt: PropTypes.string,
}

export const shippingFormat = [
  [
    {
      attribute: 'provider',
      editable: true,
      type: 'entity',
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

export const formatShipping = shipping => ({
  ...shipping,
})
