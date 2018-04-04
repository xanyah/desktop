import { connect } from 'react-redux'
import FormAttribute from '../../components/form-attribute'

const mapStateToProps = ({ manufacturers: { manufacturers }, products: { products }, providers: { providers }, settings: { categories }}) => ({
  categories,
  manufacturers,
  products,
  providers,
})

export default connect(mapStateToProps)(FormAttribute)
