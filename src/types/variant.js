import PropTypes from 'prop-types'
import { ProductType, ProviderType } from './index.js'

export const VariantType = {
  barcode: PropTypes.string,
  buying_price: PropTypes.double,
  created_at: PropTypes.string,
  default: PropTypes.bool,
  id: PropTypes.string,
  original_barcode: PropTypes.string,
  product: PropTypes.objectOf(ProductType),
  provider: PropTypes.objectOf(ProviderType),
  quantity: PropTypes.int,
  ratio: PropTypes.double,
  tax_free_price: PropTypes.double,
}
