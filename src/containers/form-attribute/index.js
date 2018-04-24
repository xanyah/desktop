import { connect } from 'react-redux'
import FormAttribute from '../../components/form-attribute'

const mapStateToProps = ({
  customAttributes: { customAttributes },
  manufacturers: { manufacturers },
  products: { products },
  providers: { providers },
  settings: { categories },
}) => ({
  categories,
  customAttributes,
  manufacturers,
  products,
  providers,
})

export default connect(mapStateToProps)(FormAttribute)
