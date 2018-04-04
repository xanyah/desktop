import { connect } from 'react-redux'
import VariantPage from '../../components/variant-page'
import {
  updateGlobalField,
  updateProductsField,
  updateApiVariant,
} from '../../actions'

const mapStateToProps = ({ products: { loading, selectedProduct, selectedVariant, variantEditing, variants }}) => ({
  loading,
  selectedProduct,
  selectedVariant,
  variantEditing,
  variants,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
  updateApiVariant: updatedVariant => {
    dispatch(updateApiVariant(updatedVariant))
  },
  updateProductsField: (field, value) => dispatch(updateProductsField(field, value)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  toggleVariant: () => dispatchProps.dispatch(updateProductsField('variantEditing', !stateProps.variantEditing)),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(VariantPage)
