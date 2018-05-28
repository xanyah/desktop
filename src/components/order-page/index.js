import React from 'react'
import PropTypes from 'prop-types'
import { OrderType, orderFormat } from '../../types'
import DataDetails from '../data-details'
import PageContainer from '../../containers/page-container'

import './styles.scss'

export default class Order extends React.Component {
  componentWillMount() {
    this.props.setPageName(this.props.selectedOrder.name)
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  renderOrderVariants() {
    const { orderVariants } = this.props.selectedOrder

    return (
      <div className="order-variants">
        <h3>Order Variants</h3>
        <div className="row">
          {
            orderVariants.map(orderVariant => (
              <div className="data-row" key={orderVariant.id}>
                <div className="productName">
                  {orderVariant.variant.barcode}
                </div>
                <div className="variantName">
                  {orderVariant.variant.product.name}
                </div>
                <div className="quantity">
                  {orderVariant.quantity}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  render() {
    const {
      createApiOrder,
      editing,
      toggleOrder,
      selectedOrder,
      updateApiOrder,
    } = this.props
    return (
      <PageContainer>
        <h1 className="data-details-title">{selectedOrder.name}</h1>
        <DataDetails
          createEntity={createApiOrder}
          currentEntity={selectedOrder}
          editing={editing}
          formattedData={orderFormat}
          toggleEdit={toggleOrder}
          type="orders"
          updateEntity={updateApiOrder}
        >
          {this.renderOrderVariants()}
        </DataDetails>
      </PageContainer>
    )
  }
}

Order.propTypes = {
  createApiOrder: PropTypes.func,
  editing: PropTypes.bool,
  selectedOrder: OrderType,
  setPageName: PropTypes.func,
  toggleOrder: PropTypes.func,
  updateApiOrder: PropTypes.func,
}

Order.defaultProps = {
  createApiOrder: () => null,
  editing: false,
  selectedOrder: {},
  setPageName: () => null,
  toggleOrder: () => null,
  updateApiOrder: () => null,
}
