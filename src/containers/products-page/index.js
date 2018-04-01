import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ProductsPage from '../../components/products-page'
import { getProducts, updateProductsField, getVariants } from '../../actions'

const mapStateToProps = ({ products: { loading, products } }) => ({
  loading,
  products,
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  openProduct: product => {
    dispatch(updateProductsField('selectedProduct', product))
    dispatch(getVariants(product.id))
    dispatch(push(`/products/${product.id}`))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
