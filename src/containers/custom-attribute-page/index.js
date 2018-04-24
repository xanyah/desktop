import { connect } from 'react-redux'
import {
  createApiCustomAttribute,
  updateGlobalField,
  updateCustomAttributesField,
  updateApiCustomAttribute,
} from '../../actions'
import CustomAttributePage from '../../components/custom-attribute-page'

const mapStateToProps = ({ customAttributes: { editing, selectedCustomAttribute } }) => ({
  editing,
  selectedCustomAttribute,
})

const mapDispatchToProps = dispatch => ({
  createApiCustomAttribute: newCustomAttribute => dispatch(createApiCustomAttribute(newCustomAttribute)),
  dispatch,
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
  updateApiCustomAttribute: updatedCustomAttribute => {
    dispatch(updateApiCustomAttribute(updatedCustomAttribute))
    dispatch(updateGlobalField('currentNavigationStep', updatedCustomAttribute.name))
  },
  updateCustomAttributesField: (field,value) => dispatch(updateCustomAttributesField(field,value)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  toggleCustomAttribute: () => dispatchProps.dispatch(updateCustomAttributesField('editing', !stateProps.editing)),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomAttributePage)
