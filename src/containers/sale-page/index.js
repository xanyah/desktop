import { connect } from 'react-redux'
import {
  updateGlobalField,
  updateSaleField,
} from '../../actions'
import SalePage from '../../components/sale-page'

const mapStateToProps = ({ sales: { selectedSale } }) => ({
  selectedSale,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
  updateApiSale: updatedSale => {
    dispatch(updateGlobalField('currentNavigationStep', updatedSale.name))
  },
  updateSaleField: (field,value) => dispatch(updateSaleField(field,value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SalePage)
