import PropTypes from 'prop-types'

export const SaleType = {
  createdAt: PropTypes.string,
  id: PropTypes.string,
}

export const saleFormat = [
  [
    {
      attribute: 'createdAt',
      editable: false,
      type: 'date',
    },
  ],
]

export const formatSale = sale => ({
  ...sale,
})
