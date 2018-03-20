import PropTypes from 'prop-types'

export const InventoryType = {
  createdAt: PropTypes.string,
  id: PropTypes.string,
  lockedAt: PropTypes.string,
  storeId: PropTypes.string,
  updatedAt: PropTypes.string,
}

export const inventoryFormat = [
  [
    {
      attribute: 'lockedAt',
      editable: false,
      type: 'date',
    },
    {
      attribute: 'updatedAt',
      editable: false,
      type: 'date',
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
