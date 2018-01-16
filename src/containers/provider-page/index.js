import { connect } from 'react-redux'
import { updateGlobalField } from '../../actions'
import ProviderPage from '../../components/provider-page'

const mapStateToProps = ({ providers: { selectedProvider } }) => ({
  selectedProvider,
})

const mapDispatchToProps = dispatch => ({
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProviderPage)
