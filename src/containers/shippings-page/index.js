import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ShippingsPage from '../../components/shippings-page'
import { getShippings, updateShippingField } from '../../actions'

const mapStateToProps = ({ shippings: { loading, shippings } }) => ({
  loading,
  shippings,
})

const mapDispatchToProps = dispatch => ({
  getShippings: () => dispatch(getShippings()),
  openShipping: shipping => {
    dispatch(updateShippingField('selectedShipping', shipping))
    dispatch(push(`/shippings/${shipping.id}`))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ShippingsPage)
