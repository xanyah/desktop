import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  createApiProvider,
  getProducts,
  getVariants,
  updateGlobalField,
  updateProductsField,
  updateProviderField,
  updateApiProvider,
} from '../../actions'
import ProviderPage from '../../components/provider-page'

const mapStateToProps = ({ products: { loading, products }, providers: { editing, selectedProvider } }) => ({
  editing,
  loading,
  products,
  selectedProvider,
})

const mapDispatchToProps = dispatch => ({
  createApiProvider: newProvider => dispatch(createApiProvider(newProvider)),
  dispatch,
  getProducts: params => dispatch(getProducts(params)),
  openProduct: product => {
    dispatch(updateProductsField('selectedProduct', product))
    dispatch(getVariants(product.id))
    dispatch(push(`/products/${product.id}`))
  },
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
  updateApiProvider: updatedProvider => {
    dispatch(updateApiProvider(updatedProvider))
    dispatch(updateGlobalField('currentNavigationStep', updatedProvider.name))
  },
  updateProviderField: (field,value) => dispatch(updateProviderField(field,value)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  toggleProvider: () => dispatchProps.dispatch(updateProviderField('editing', !stateProps.editing)),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProviderPage)
