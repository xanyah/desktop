import PropTypes from 'prop-types'

export const StoreType = {
  address: PropTypes.string,
  country: PropTypes.string,
  id: PropTypes.string,
  key: PropTypes.string,
  name: PropTypes.string,
  notes: PropTypes.string,
}

export const formatStore = (store) => ({
  ...store,
  name: store.name.trim(),
})
