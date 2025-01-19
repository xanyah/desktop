import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import ProductPage from '../../components/product-page'
import {
  createApiProduct,
  createApiVariant,
  updateApiProduct,
  updateGlobalField,
  updateProductsField,
} from '../../actions'

const mapStateToProps = ({ products: { loading, productEditing, selectedProduct, selectedVariant, variants } }) => ({
  loading,
  productEditing,
  selectedProduct,
  selectedVariant,
  variants,
})

const mapDispatchToProps = dispatch => ({
  createApiProduct: (newProduct, newVariant) => {
    dispatch(createApiProduct(newProduct))
    dispatch(createApiVariant(newVariant, true))
  },
  createApiVariant: newVariant => dispatch(createApiVariant(newVariant)),
  dispatch,
  openVariant: variant => {
    dispatch(updateProductsField('selectedVariant', variant))
    // dispatch(push(`/products/${variant.product.id}/${variant.id}`))
  },
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
  updateApiProduct: updatedProduct => {
    dispatch(updateApiProduct(updatedProduct))
    dispatch(updateGlobalField('currentNavigationStep', updatedProduct.name))
  },
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  toggleProduct: () => dispatchProps.dispatch(updateProductsField('productEditing', !stateProps.productEditing)),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProductPage)
