import { connect } from 'react-redux'
import { updateGlobalField, updateProviderField, updateProviderParams } from '../../actions'
import ProviderPage from '../../components/provider-page'

const mapStateToProps = ({ providers: { editing, selectedProvider } }) => ({
  editing,
  selectedProvider,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
  updateProviderParams: (id,params) => dispatch(updateProviderParams(id,params)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  toggleProvider: () => dispatchProps.dispatch(updateProviderField('editing', !stateProps.editing)),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProviderPage)
