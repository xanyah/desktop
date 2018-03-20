import { connect } from 'react-redux'
import {
  createApiProvider,
  updateGlobalField,
  updateProviderField,
  updateApiProvider,
} from '../../actions'
import ProviderPage from '../../components/provider-page'

const mapStateToProps = ({ providers: { editing, selectedProvider } }) => ({
  editing,
  selectedProvider,
})

const mapDispatchToProps = dispatch => ({
  createApiProvider: newProvider => dispatch(createApiProvider(newProvider)),
  dispatch,
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
  updateApiProvider: updatedProvider => {
    dispatch(updateApiProvider(updatedProvider))
    dispatch(updateGlobalField('currentNavigationStep', updatedProvider.name))
  },
  updateProviderField: (field,value) => dispatch(updateProviderField(field,value)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  toggleProvider: () => dispatchProps.dispatch(updateProviderField('editing', !stateProps.editing)),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProviderPage)
