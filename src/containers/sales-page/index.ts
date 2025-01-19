import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import SalesPage from '../../components/sales-page'
import { getSales, updateSaleField } from '../../actions'

const mapStateToProps = ({ sales: { loading, sales } }) => ({
  loading,
  sales,
})

const mapDispatchToProps = dispatch => ({
  getSales: () => dispatch(getSales()),
  openSale: sale => {
    dispatch(updateSaleField('selectedSale', sale))
    // dispatch(push(`/sales/${sale.id}`))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesPage)
