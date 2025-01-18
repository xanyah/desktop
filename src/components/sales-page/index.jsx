import React from 'react'
import PropTypes from 'prop-types'
import { SaleType } from '../../types'
import DataTable from '../data-table'
import PageContainer from '../page-container'

import './styles.scss'

export default class Sales extends React.Component {
  componentDidMount() {
    this.props.getSales()
  }

  render() {
    const {
      loading,
      openSale,
      sales,
    } = this.props
    return (
      <PageContainer>
        <DataTable
          columns={['createdAt']}
          creationFunction={false}
          data={sales}
          loading={loading}
          onItemView={item => openSale(item)}
          type="Sales"
        />
      </PageContainer>
    )
  }
}

Sales.propTypes = {
  getSales: PropTypes.func,
  loading: PropTypes.bool,
  openSale: PropTypes.func,
  sales: PropTypes.arrayOf(SaleType),
}

Sales.defaultProps = {
  getSales: () => null,
  loading: true,
  openSale: () => null,
  sales: [],
}
