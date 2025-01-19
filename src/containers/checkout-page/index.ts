import { connect } from 'react-redux'
import CheckoutPage from '../../components/checkout-page'

const mapStateToProps = ({ stores: { currentStore }}) => ({
  storeId: currentStore.id,
})

export default connect(mapStateToProps)(CheckoutPage)
