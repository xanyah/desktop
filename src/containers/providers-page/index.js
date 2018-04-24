import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ProvidersPage from '../../components/providers-page'
import { getProviders, searchApiProvider, updateProviderField } from '../../actions'

const mapStateToProps = ({ providers: { loading, providers } }) => ({
  loading,
  providers,
})

const mapDispatchToProps = dispatch => ({
  getProviders: () => dispatch(getProviders()),
  openProvider: provider => {
    dispatch(updateProviderField('selectedProvider', provider))
    dispatch(push(`/providers/${provider.id}`))
  },
  searchApiProvider: query => dispatch(searchApiProvider(query)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProvidersPage)
