import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import ClientsPage from '../../components/clients-page'
import {
  getClients,
  updateClientField,
  searchApiClient,
} from '../../actions'

const mapStateToProps = ({ clients: { clients, loading } }) => ({
  clients,
  loading,
})

const mapDispatchToProps = dispatch => ({
  getClients: () => dispatch(getClients()),
  openClient: client => {
    dispatch(updateClientField('selectedClient', client))
    // dispatch(push(`/clients/${client.id}`))
  },
  searchApiClient: query => dispatch(searchApiClient(query)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPage)
