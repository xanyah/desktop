import { connect } from 'react-redux'
import {
  updateGlobalField,
  updateInventoriesField,
} from '../../actions'
import InventoryPage from '../../components/inventory-page'

const mapStateToProps = ({ inventories: { editing, selectedInventory } }) => ({
  editing,
  selectedInventory,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
  updateInventoriesField: (field,value) => dispatch(updateInventoriesField(field,value)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  toggleInventory: () => dispatchProps.dispatch(updateInventoriesField('editing', !stateProps.editing)),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(InventoryPage)
