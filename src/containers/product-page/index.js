import { connect } from 'react-redux'
import ProductPage from '../../components/product-page'
import {
  updateGlobalField,
} from '../../actions'

const mapStateToProps = ({ products: { loading, selectedProduct, variants } }) => ({
  loading,
  selectedProduct,
  variants,
})

const mapDispatchToProps = dispatch => ({
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
