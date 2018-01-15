import { connect } from 'react-redux'
import ProviderPage from '../../components/provider-page'

const mapStateToProps = ({ providers: { selectedProvider } }) => ({
  selectedProvider,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ProviderPage)
