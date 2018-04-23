import { connect } from 'react-redux'
import {
  createApiClient,
  updateGlobalField,
  updateClientField,
  updateApiClient,
} from '../../actions'
import ClientPage from '../../components/client-page'

const mapStateToProps = ({ clients: { editing, selectedClient } }) => ({
  editing,
  selectedClient,
})

const mapDispatchToProps = dispatch => ({
  createApiClient: newClient => dispatch(createApiClient(newClient)),
  dispatch,
  setPageName: name => dispatch(updateGlobalField('currentNavigationStep', name)),
  updateApiClient: updatedClient => {
    dispatch(updateApiClient(updatedClient))
    dispatch(updateGlobalField(
      'currentNavigationStep',
      `${updatedClient.firstname} ${updatedClient.lastname}`
    ))
  },
  updateClientField: (field,value) => dispatch(updateClientField(field,value)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  toggleClient: () => dispatchProps.dispatch(updateClientField(
    'editing',
    !stateProps.editing
  )),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ClientPage)
