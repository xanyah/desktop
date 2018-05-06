import React from 'react'
import PropTypes from 'prop-types'
import { ShippingType } from '../../types'
import DataTable from '../data-table'
import PageContainer from '../page-container'

import './styles.scss'

export default class Shippings extends React.Component {
  componentDidMount() {
    this.props.getShippings()
  }

  render() {
    const {
      loading,
      openShipping,
      shippings,
    } = this.props
    return (
      <PageContainer>
        <DataTable
          columns={['status', 'provider']}
          data={shippings}
          loading={loading}
          onItemView={item => openShipping(item)}
          type="shippings"
        />
      </PageContainer>
    )
  }
}

Shippings.propTypes = {
  getShippings: PropTypes.func,
  loading: PropTypes.bool,
  openShipping: PropTypes.func,
  shippings: PropTypes.arrayOf(ShippingType),
}

Shippings.defaultProps = {
  getShippings: () => null,
  loading: true,
  openShipping: () => null,
  shippings: [],
}
