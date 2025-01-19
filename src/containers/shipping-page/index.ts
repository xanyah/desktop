import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import {
  getProducts,
  getVariants,
  updateGlobalField,
  updateProductsField,
  updateShippingField,
  updateApiShipping,
} from '../../actions'
import ShippingPage from '../../components/shipping-page'

const mapStateToProps = ({ products: { loading, products }, shippings: { editing, selectedShipping } }) => ({
  editing,
  loading,
  products,
  selectedShipping,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  getProducts: params => dispatch(getProducts(params)),
  openProduct: product => {
    dispatch(updateProductsField('selectedProduct', product))
    dispatch(getVariants(product.id))
    // dispatch(push(`/products/${product.id}`))
  },
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
  updateApiShipping: updatedShipping => {
    dispatch(updateApiShipping(updatedShipping))
    dispatch(updateGlobalField('currentNavigationStep', updatedShipping.name))
  },
  updateShippingField: (field,value) => dispatch(updateShippingField(field,value)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  toggleShipping: () => dispatchProps.dispatch(updateShippingField('editing', !stateProps.editing)),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ShippingPage)
