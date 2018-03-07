import { connect } from 'react-redux'
import { updateGlobalField } from '../../actions'
import ManufacturerPage from '../../components/manufacturer-page'

const mapStateToProps = ({ manufacturers: { selectedManufacturer } }) => ({
  selectedManufacturer,
})

const mapDispatchToProps = dispatch => ({
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerPage)
