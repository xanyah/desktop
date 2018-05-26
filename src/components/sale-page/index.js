import React from 'react'
import PropTypes from 'prop-types'
import { SaleType, saleFormat } from '../../types'
import DataDetails from '../data-details'
import PageContainer from '../../containers/page-container'

import './styles.scss'

export default class Sale extends React.Component {
  componentWillMount() {
    const { setPageName } = this.props
    setPageName(this.props.selectedSale.name)
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  renderSalePayments() {
    const { salePayments } = this.props.selectedSale

    if(!salePayments)
      return null

    return (
      <div className="sale-payments">
        <h3>Payments</h3>
        { salePayments.map(salePayment => (
          <div className="sale-payments-content">
            <div>Total: {salePayment.total}</div>
            <div>Type: {salePayment.paymentType.name} - {salePayment.paymentType.description}</div>
          </div>
        ))}
      </div>
    )
  }

  renderSaleVariants() {
    const { saleVariants } = this.props.selectedSale

    if(!saleVariants)
      return null

    return (
      <div className="sale-variants">
        <h3>Products</h3>
        { saleVariants.map(saleVariant => (
          <div className="sale-variants-content">
            <div>Product: {saleVariant.variant.name}</div>
            <div>Quantity: {saleVariant.quantity}</div>
            <div>Unit Price: {saleVariant.unitPrice}</div>
            <div>Promotion: {saleVariant.saleVariantPromotion}</div>
          </div>
        ))}
      </div>
    )
  }

  renderSaleInfos() {
    const { store, user, client, salePromotion, totalPrice} = this.props.selectedSale

    return (
      <div className="sale-informations">
        {
          (store) &&
          <div className="sale-store">
            <h3>Store infos</h3>
            <div className="sale-store-content">{store.name} - {store.country}</div>
          </div>
        }
        {
          (user) &&
          <div className="sale-user">
            <h3>Saler infos</h3>
            <div className="sale-user-content">{user.firstname} {user.lastname}</div>
          </div>
        }
        {
          (client) &&
          <div className="sale-client">
            <h3>Client infos</h3>
            <div className="sale-client-content">Client: {client.firstname} {client.lastname}</div>
          </div>
        }
        {
          (salePromotion) &&
          <div className="sale-promotion">
            <div className="sale-promotion-content">Sale Promotion: {salePromotion}</div>
          </div>
        }
        {
          (totalPrice) &&
          <div className="sale-total-price">
            <div className="sale-total-price-content">Total Price: {totalPrice}</div>
          </div>
        }
        {this.renderSalePayments()}
        {this.renderSaleVariants()}
      </div>
    )
  }

  render() {
    const {
      selectedSale,
    } = this.props
    return (
      <PageContainer>
        <h1 className="data-details-title">{selectedSale.name}</h1>
        <DataDetails
          currentEntity={selectedSale}
          formattedData={saleFormat}
          type="sales"
        >
          {this.renderSaleInfos()}
        </DataDetails>
      </PageContainer>
    )
  }
}

Sale.propTypes = {
  selectedSale: SaleType,
  setPageName: PropTypes.func,
}

Sale.defaultProps = {
  selectedSale: {},
  setPageName: () => null,
}
