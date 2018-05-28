import React from 'react'
import PropTypes from 'prop-types'
import { OrderType } from '../../types'
import DataTable from '../data-table'
import PageContainer from '../page-container'

import './styles.scss'

export default class Orders extends React.Component {
  componentDidMount() {
    this.props.getOrders()
  }

  // TODO: Order Management (creation=false for the presentation to avoid bug)
  render() {
    const {
      searchApiOrder,
      loading,
      openOrder,
      orders,
    } = this.props
    return (
      <PageContainer>
        <DataTable
          creation={false}
          columns={['status', 'id']}
          data={orders}
          loading={loading}
          onItemView={item => openOrder(item)}
          type="orders"
          searchEntity={searchApiOrder}
        />
      </PageContainer>
    )
  }
}

Orders.propTypes = {
  getOrders: PropTypes.func,
  loading: PropTypes.bool,
  openOrder: PropTypes.func,
  orders: PropTypes.arrayOf(OrderType),
  searchApiOrder: PropTypes.func,
}

Orders.defaultProps = {
  getOrders: () => null,
  loading: true,
  openOrder: () => null,
  orders: [],
  searchApiOrder: () => null,
}
