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
      openProvider,
      providers,
    } = this.props
    return (
      <PageContainer>
        <DataTable
          columns={['name', 'notes', 'createdAt']}
          data={providers}
          onItemView={item => openProvider(item)}
          type="providers"
        />
      </PageContainer>
    )
  }
}

Providers.propTypes = {
  getProviders: PropTypes.func,
  openProvider: PropTypes.func,
  providers: PropTypes.arrayOf(ProviderType),
}

Providers.defaultProps = {
  getProviders: () => null,
  openProvider: () => null,
  providers: [],
}
