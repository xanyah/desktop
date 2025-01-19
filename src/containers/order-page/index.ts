import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import {
  createApiOrder,
  getProducts,
  getVariants,
  updateGlobalField,
  updateProductsField,
  updateOrderField,
  updateApiOrder,
} from '../../actions'
import OrderPage from '../../components/order-page'

const mapStateToProps = ({ products: { loading, products }, orders: { editing, selectedOrder } }) => ({
  editing,
  loading,
  products,
  selectedOrder,
})

const mapDispatchToProps = dispatch => ({
  createApiOrder: newOrder => dispatch(createApiOrder(newOrder)),
  dispatch,
  getProducts: params => dispatch(getProducts(params)),
  openProduct: product => {
    dispatch(updateProductsField('selectedProduct', product))
    dispatch(getVariants(product.id))
    // dispatch(push(`/products/${product.id}`))
  },
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
  updateApiOrder: updatedOrder => {
    dispatch(updateApiOrder(updatedOrder))
    dispatch(updateGlobalField('currentNavigationStep', updatedOrder.name))
  },
  updateOrderField: (field,value) => dispatch(updateOrderField(field,value)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  toggleOrder: () => dispatchProps.dispatch(updateOrderField('editing', !stateProps.editing)),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(OrderPage)
