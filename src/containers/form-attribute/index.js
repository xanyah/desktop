import { connect } from 'react-redux'
import FormAttribute from '../../components/form-attribute'

const mapStateToProps = ({
  categories: { categories },
  customAttributes: { customAttributes },
  manufacturers: { manufacturers },
  products: { products },
  providers: { providers },
}) => ({
  categories,
  customAttributes,
  manufacturers,
  products,
  providers,
})

export default connect(mapStateToProps)(FormAttribute)
