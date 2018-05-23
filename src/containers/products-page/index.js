import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ProductsPage from '../../components/products-page'
import {
  getProducts,
  updateProductsField,
  getVariants,
  searchApiProduct,
} from '../../actions'

const mapStateToProps = ({ products: { loading, products } }) => ({
  loading,
  products,
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  goToProductCreationPage: () => {
    dispatch(push('/product/new'))
  },
  openProduct: product => {
    dispatch(updateProductsField('selectedProduct', product))
    dispatch(getVariants(product.id))
    dispatch(push(`/products/${product.id}`))
  },
  searchApiProduct: query => dispatch(searchApiProduct(query)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
