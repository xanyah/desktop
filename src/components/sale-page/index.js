import React from 'react'
import PropTypes from 'prop-types'
import { SaleType } from '../../types'
import ItemAttribute from '../item-attribute'
import PageContainer from '../../containers/page-container'
import { formatPrice } from '../../utils/data-helper'
import { Translate } from 'react-redux-i18n'

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
        <h3><Translate value='models.sales.salePaymentTitle'/></h3>
        { salePayments.map(salePayment => (
          <div className="sale-payments-content">
            {
              salePayment.total &&
              <ItemAttribute
                attribute='salePaymentTotal'
                key='salePaymentTotal'
                value={formatPrice(salePayment.total)}
                type='text'
              />
            }
            {
              salePayment.paymentType &&
              (
                <div className="sale-payments-type">
                  <ItemAttribute
                    attribute='salePaymentTypeName'
                    key='salePaymentTypeName'
                    value={salePayment.paymentType.name}
                    type='text'
                  />
                  <ItemAttribute
                    attribute='salePaymentTypeDescription'
                    key='salePaymentTypeDescription'
                    value={salePayment.paymentType.description}
                    type='text'
                  />
                </div>
              )
            }
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
        <h3><Translate value='models.products.title'/></h3>
        <div className="sale-variant-header">
          <div className="product-name">
            <Translate value='models.products.name'/>
          </div>
          <div className="variant-barcode">
            <Translate value='models.variants.barcode'/>
          </div>
          <div className="quantity">
            <Translate value='models.variants.quantity'/>
          </div>
          <div className="unit-price">
            <Translate value='models.variants.unitPrice'/>
          </div>
          <div className="promotion">
            <Translate value='models.sales.saleVariantPromotion'/>
          </div>
        </div>
        { saleVariants.map(saleVariant => (
          <div className="sale-variant">
            <div className="product-name">{saleVariant.variant.product.name}</div>
            <div className="variant-barcode">{saleVariant.variant.barcode}</div>
            <div className="quantity">{saleVariant.quantity}</div>
            <div className="unit-price">{saleVariant.unitPrice}</div>
            <div className="promotion">{saleVariant.saleVariantPromotion || '/'}</div>
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
            <h3><Translate value='models.stores.title'/></h3>
            <div className="sale-store-content row">
              <ItemAttribute
                attribute='storeName'
                key='storeName'
                value={store.name}
                type='text'
              />

              <ItemAttribute
                attribute='storeCountry'
                key='storeCountry'
                value={store.country}
                type='text'
              />
            </div>
          </div>
        }
        {
          (user) &&
          <div className="sale-user">
            <h3><Translate value='models.sales.shopkeeper'/></h3>
            <div className="sale-user-content row">
              <ItemAttribute
                attribute='userFirstname'
                key='userFirstname'
                value={user.firstname}
                type='text'
              />

              <ItemAttribute
                attribute='userLastname'
                key='userLastname'
                value={user.lastname}
                type='text'
              />
            </div>
          </div>
        }
        {
          (client) &&
          <div className="sale-client">
            <h3><Translate value='models.clients.title'/></h3>
            <div className="sale-client-content row">
              <ItemAttribute
                attribute='clientFirstname'
                key='clientFirstname'
                value={client.firstname}
                type='text'
              />

              <ItemAttribute
                attribute='clientLastname'
                key='clientLastname'
                value={client.lastname}
                type='text'
              />
            </div>
          </div>
        }
        {
          (salePromotion) &&
          <div className="sale-promotion">
            <h3><Translate value='models.sales.salePromotion'/></h3>
            <div className="sale-promotion-content row">
              <ItemAttribute
                attribute='salePromotionAmount'
                key='salePromotionAmount'
                value={salePromotion.amount}
                type='text'
              />

              <ItemAttribute
                attribute='salePromotionType'
                key='salePromotionType'
                value={salePromotion.type}
                type='text'
              />
            </div>
          </div>
        }
        {
          (totalPrice) &&
          <div className="sale-total-price">
            <div className="sale-total-price-content row">
              <ItemAttribute
                attribute='totalPrice'
                key='totalPrice'
                value={formatPrice(totalPrice)}
                type='text'
              />
            </div>
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
        {this.renderSaleInfos()}
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
