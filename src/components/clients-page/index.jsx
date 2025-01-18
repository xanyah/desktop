import React from 'react'
import PropTypes from 'prop-types'
import { ClientType } from '../../types'
import DataTable from '../data-table'
import PageContainer from '../page-container'

import './styles.scss'

export default class Clients extends React.Component {
  componentDidMount() {
    this.props.getClients()
  }

  render() {
    const {
      clients,
      loading,
      openClient,
      searchApiClient,
    } = this.props
    return (
      <PageContainer>
        <DataTable
          columns={['firstname', 'lastname']}
          data={clients}
          loading={loading}
          onItemView={item => openClient(item)}
          type="clients"
          searchEntity={searchApiClient}
        />
      </PageContainer>
    )
  }
}

Clients.propTypes = {
  clients: PropTypes.arrayOf(ClientType),
  getClients: PropTypes.func,
  loading: PropTypes.bool,
  openClient: PropTypes.func,
  searchApiClient: PropTypes.func,
}

Clients.defaultProps = {
  clients: [],
  getClients: () => null,
  loading: true,
  openClient: () => null,
  searchApiClient: () => null,
}
