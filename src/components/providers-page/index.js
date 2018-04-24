import React from 'react'
import PropTypes from 'prop-types'
import { ProviderType } from '../../types'
import DataTable from '../data-table'
import PageContainer from '../page-container'

import './styles.scss'

export default class Providers extends React.Component {
  componentDidMount() {
    this.props.getProviders()
  }

  render() {
    const {
      searchApiProvider,
      loading,
      openProvider,
      providers,
    } = this.props
    return (
      <PageContainer>
        <DataTable
          columns={['name', 'notes', 'shippingsCount']}
          data={providers}
          loading={loading}
          onItemView={item => openProvider(item)}
          type="providers"
          searchEntity={searchApiProvider}
        />
      </PageContainer>
    )
  }
}

Providers.propTypes = {
  getProviders: PropTypes.func,
  loading: PropTypes.bool,
  openProvider: PropTypes.func,
  providers: PropTypes.arrayOf(ProviderType),
  searchApiProvider: PropTypes.func,
}

Providers.defaultProps = {
  getProviders: () => null,
  loading: true,
  openProvider: () => null,
  providers: [],
  searchApiProvider: () => null,
}
