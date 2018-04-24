import PropTypes from 'prop-types'

export const OrderType = {
  createdAt: PropTypes.string,
  id: PropTypes.string,
  status: PropTypes.string,
  storeId: PropTypes.string,
  updatedAt: PropTypes.string,
}

export const orderFormat = [
  [
    {
      attribute: 'status',
      editable: true,
      type: 'string',
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

export const formatOrder = order => ({
  ...order,
})
