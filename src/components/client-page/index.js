import React from 'react'
import PropTypes from 'prop-types'
import { ClientType, clientFormat } from '../../types'
import DataDetails from '../data-details'
import PageContainer from '../../containers/page-container'

import './styles.scss'

export default class Client extends React.Component {
  componentWillMount() {
    const {
      firstname,
      lastname,
    } = this.props.selectedClient
    this.props.setPageName(`${firstname} ${lastname}`)
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  render() {
    const {
      createApiClient,
      editing,
      toggleClient,
      selectedClient,
      updateApiClient,
    } = this.props
    return (
      <PageContainer>
        <h1>{selectedClient.firstname}</h1>
        <DataDetails
          createEntity={createApiClient}
          currentEntity={selectedClient}
          editing={editing}
          formattedData={clientFormat}
          toggleEdit={toggleClient}
          type="clients"
          updateEntity={updateApiClient}
        />
      </PageContainer>
    )
  }
}

Client.propTypes = {
  createApiClient: PropTypes.func,
  editing: PropTypes.bool,
  selectedClient: ClientType,
  setPageName: PropTypes.func,
  toggleClient: PropTypes.func,
  updateApiClient: PropTypes.func,
}

Client.defaultProps = {
  createApiClient: () => null,
  editing: false,
  selectedClient: {},
  setPageName: () => null,
  toggleClient: () => null,
  updateApiClient: () => null,
}
