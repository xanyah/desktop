import { connect } from 'react-redux'
import { updateGlobalField, updateManufacturerField, updateManufacturerParams } from '../../actions'
import ManufacturerPage from '../../components/manufacturer-page'

const mapStateToProps = ({ manufacturers: { editing, selectedManufacturer } }) => ({
  editing,
  selectedManufacturer,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
  updateManufacturerField: (field,value) => dispatch(updateManufacturerField(field,value)),
  updateManufacturerParams: (id,params) => dispatch(updateManufacturerParams(id,params)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  toggleManufacturer: () => dispatchProps.dispatch(updateManufacturerField('editing', !stateProps.editing)),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ManufacturerPage)
