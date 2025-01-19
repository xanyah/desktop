import PropTypes from 'prop-types'

export const ClientType = {
  address: PropTypes.string,
  email: PropTypes.string,
  firstname: PropTypes.string,
  id: PropTypes.string,
  lastname: PropTypes.string,
  notes: PropTypes.string,
  phone: PropTypes.string,
  storeId: PropTypes.string,
}


export const clientFormat = [
  [
    {
      attribute: 'firstname',
      editable: true,
      type: 'string',
    },
    {
      attribute: 'lastname',
      editable: true,
      type: 'string',
    },
  ],
  [
    {
      attribute: 'email',
      editable: true,
      type: 'string',
    },
    {
      attribute: 'phone',
      editable: true,
      type: 'string',
    },
  ],
  [
    {
      attribute: 'address',
      editable: true,
      type: 'string',
    },
  ],
  [
    {
      attribute: 'notes',
      editable: true,
      type: 'string',
    },
  ],
]

export const formatClient = client => ({
  ...client,
})
