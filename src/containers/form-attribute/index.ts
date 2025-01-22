import { connect } from 'react-redux'
import {FormAttribute} from '../../components'

const mapStateToProps = ({
  categories: { categories },
  clients: { clients },
  customAttributes: { customAttributes },
  manufacturers: { manufacturers },
  products: { products },
  providers: { providers },
}) => ({
  categories,
  clients,
  customAttributes,
  manufacturers,
  products,
  providers,
})

export default connect(mapStateToProps)(FormAttribute)
