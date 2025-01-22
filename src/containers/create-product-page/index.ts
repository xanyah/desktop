import { connect } from 'react-redux'
import CreateProductPage from '../../components/create-product-page'
import { createApiProduct, updateGlobalField } from '../../actions'

const mapStateToProps = (
  { products: {
    loading,
    productEditing,
    selectedProduct,
    selectedVariant,
    variants,
  }}) => ({
  loading,
  productEditing,
  selectedProduct,
  selectedVariant,
  variants,
})

const mapDispatchToProps = dispatch => ({
  createApiProduct: (newProduct, newVariant) =>
    dispatch(createApiProduct(newProduct, newVariant)),
  dispatch,
  setPageName: name =>
    dispatch(updateGlobalField('currentNavigationStep', name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductPage)
