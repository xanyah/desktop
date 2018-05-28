import React from 'react'
import swal from 'sweetalert'
import PropTypes from 'prop-types'
import { I18n, Translate } from 'react-redux-i18n'
import Select from 'react-select'
import Checkbox from '../checkbox'
import { Link } from 'react-router-dom'
import Input from '../input'
import Modal from '../modal'
import PageContainer from '../page-container'

import './styles.scss'

import promotionTypes from '../../constants/promotion-types'
import {
  createSale,
  getPaymentTypes,
  getVariantByBarcode,
} from '../../utils/api-helper'
import {
  formatPrice,
  getSaleVariantsTotal,
  getSaleTotal,
} from '../../utils/data-helper'
import {
  showErrorToast,
  showSuccessToast,
} from '../../utils/notification-helper'

const initialState = {
  displayedModal: false,
  hasPromotion: false,
  salePayments: [],
  salePromotion: {},
  saleVariants: [],
  variantBarcode: '',
}

export default class Checkout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...initialState,
      paymentTypes: [],
    }
  }

  componentDidMount() {
    const { storeId } = this.props
    getPaymentTypes({ storeId })
      .then(({ data }) => this.setState({ paymentTypes: data }))
  }

  resetSale() {
    this.setState({
      ...initialState,
    })
  }

  onVariantSearch(e) {
    e.preventDefault()
    const { saleVariants, variantBarcode } = this.state
    getVariantByBarcode(variantBarcode)
      .then(({ data }) => {
        const variant = saleVariants.find(v => v.variant.id === data.id)
        // If variant already exists, we just increment the quantity
        if (variant) {
          this.setState({
            saleVariants: saleVariants.map(v => v.variant.id === data.id
              ? { ...v, quantity: v.quantity + 1 } : v),
            variantBarcode: '',
          })
        } else {
          this.setState({
            saleVariants: [
              ...saleVariants,
              { quantity: 1, variant: data },
            ],
            variantBarcode: '',
          })
        }
      })
      .catch(() => this.setState({ variantBarcode: '' },
        () => showErrorToast(I18n.t('toast.not-found', { entity: I18n.t('models.products.title')}))))
  }

  updateQuantity(variantId, quantity) {
    this.setState({
      saleVariants: this.state.saleVariants.map(saleVariant => saleVariant.variant.id === variantId
        ? {
          ...saleVariant,
          quantity: quantity && quantity > 0 ? quantity : 0,
        } : saleVariant),
    })
  }

  removeVariant(variantId) {
    this.setState({
      saleVariants: this.state.saleVariants.filter(saleVariant => saleVariant.variant.id !== variantId),
    })
  }

  addVariantPromotion(variantId) {
    this.setState({
      saleVariants: this.state.saleVariants.map(saleVariant => saleVariant.variant.id === variantId
        ? {
          ...saleVariant,
          saleVariantPromotion: {
            amount: 0,
            type: promotionTypes[0],
          },
        } : saleVariant),
    })
  }

  getVariantsTotal() {
    return getSaleVariantsTotal(this.state.saleVariants)
  }

  getTotal() {
    return getSaleTotal(this.state)
  }

  validateSale() {
    const { storeId } = this.props
    const {
      salePayments,
      salePromotion,
      saleVariants,
    } = this.state
    createSale({
      salePayments: salePayments.map(salePayment => ({
        paymentTypeId: salePayment.paymentType.id,
        total: salePayment.total,
      })),
      salePromotion: salePromotion.type
        ? ({
          amount: salePromotion.amount,
          type: salePromotion.type.key,
        })
        : null,
      saleVariants: saleVariants.map(saleVariant => ({
        quantity: saleVariant.quantity,
        saleVariantPromotion: saleVariant.saleVariantPromotion
          ? ({
            amount: saleVariant.saleVariantPromotion.amount,
            type: saleVariant.saleVariantPromotion.type.key,
          })
          : null,
        unitPrice: saleVariant.variant.price,
        variantId: saleVariant.variant.id,
      })),
      storeId,
      totalPrice: this.getTotal(),
    }).then(() => {
      this.resetSale()
      showSuccessToast(I18n.t('toast.created', {entity: I18n.t('models.sales.title')}))
    })
  }

  renderVariant({ saleVariantPromotion, quantity, variant: { id, product, provider, price } }) {
    const { saleVariants } = this.state
    return <div className="sale-variant" key={id}>
      <div className="variant-infos">
        <h5>{product.name}</h5>
        <ul>
          <li><b>{I18n.t('models.manufacturers.title')}:</b> {product.manufacturer.name}</li>
          <li><b>{I18n.t('models.providers.title')}:</b> {provider.name}</li>
          <li><b>{I18n.t('models.variants.unitPrice')}:</b> {formatPrice(price)}</li>
        </ul>
      </div>
      <div className="variant-quantity">
        <button onClick={() => this.updateQuantity(id, quantity - 1)}>
          <i className="im im-minus" />
        </button>
        <Input type="text" onChange={e => this.updateQuantity(id, parseInt(e.target.value))} value={quantity} />
        <button onClick={() => this.updateQuantity(id, quantity + 1)}>
          <i className="im im-plus" />
        </button>
      </div>
      <div className="variant-price">
        <h5>
          {saleVariantPromotion
            ? formatPrice(saleVariantPromotion.type.calculatePrice(quantity * price, saleVariantPromotion.amount || 0))
            : formatPrice(quantity * price)}
        </h5>
        <div className="variant-options">
          {saleVariantPromotion
            ? (
              <div className="variant-discount">
                <Select
                  clearable={false}
                  value={saleVariantPromotion.type.key}
                  options={promotionTypes.map(({ key }) => ({
                    label: I18n.t(`promotion-types.${key}`),
                    value: key,
                  }))}
                  onChange={({ value }) => this.setState({
                    saleVariants: saleVariants.map(saleVariant => saleVariant.variant.id === id
                      ? {
                        ...saleVariant,
                        saleVariantPromotion: {
                          ...saleVariant.saleVariantPromotion,
                          type: promotionTypes.find(({ key }) => key === value),
                        },
                      } : saleVariant)})}
                />
                <Input
                  type="number"
                  step="any"
                  value={saleVariantPromotion.amount}
                  onChange={e => this.setState({
                    saleVariants: saleVariants.map(saleVariant => saleVariant.variant.id === id
                      ? {
                        ...saleVariant,
                        saleVariantPromotion: {
                          ...saleVariant.saleVariantPromotion,
                          amount: parseInt(e.target.value, 10),
                        },
                      } : saleVariant)})}
                />
              </div>
            )
            : (<button className="btn btn-primary" onClick={() => this.addVariantPromotion(id)}>
              {I18n.t('checkout.add-promotion')}
            </button>)}
          <button className="btn btn-danger" onClick={() => this.removeVariant(id)}>
            {I18n.t('checkout.remove-article')}
          </button>
        </div>
      </div>
    </div>
  }

  renderPaymentType(paymentType) {
    const { salePayments } = this.state
    const selectedSalePayment = salePayments.find(salePayment =>
      salePayment.paymentType.id === paymentType.id)
    return (<li key={paymentType.id}>
      <Checkbox
        checked={!!selectedSalePayment}
        onChange={() => selectedSalePayment
          ? this.setState({
            salePayments: salePayments.filter(salePayment =>
              salePayment.paymentType.id !== paymentType.id),
          })
          : this.setState({
            salePayments: [
              ...salePayments,
              {
                paymentType,
                total: salePayments.length < 1 ? this.getVariantsTotal() : 0,
              },
            ],
          })}
      >
        {paymentType.name}
      </Checkbox>
      {selectedSalePayment
        && <Input
          type="number"
          step="any"
          value={selectedSalePayment.total}
          onChange={e => this.setState({
            salePayments: salePayments.map(salePayment =>
              salePayment.paymentType.id === paymentType.id
                ? {
                  paymentType,
                  total: e.target.value,
                }
                : salePayment
            )})}
        />}
    </li>)
  }

  render() {
    const {
      displayedModal,
      hasPromotion,
      paymentTypes,
      salePayments,
      salePromotion,
      saleVariants,
      variantBarcode,
    } = this.state
    const change = salePayments.reduce((a, b) => a + parseFloat(b.total), 0) - this.getVariantsTotal()
    return (
      <PageContainer>
        <div className="checkout-page">
          <form onSubmit={e => this.onVariantSearch(e)}>
            <i className="im im-magnifier" />
            <Input
              type="text"
              placeholder={`${I18n.t('checkout.type-barcode')}...`}
              onChange={e => this.setState({ variantBarcode: e.target.value })}
              value={variantBarcode}
            />
            <button type="submit" />
            <h3>{formatPrice(this.getVariantsTotal())}</h3>
          </form>
          <div className="sale-variants">
            {saleVariants.map(variant => this.renderVariant(variant))}
          </div>
          {saleVariants.length > 0 && (
            <div className="buttons-container">
              <button className="btn btn-danger" onClick={() =>
                swal({
                  buttons: true,
                  dangerMode: true,
                  icon: 'warning',
                  text: I18n.t('checkout.reset-alert.text'),
                  title: I18n.t('checkout.reset-alert.title'),
                })
                  .then((willDelete) => {
                    if (willDelete) {
                      this.resetSale()
                    }
                  })}>
                <i className="im im-x-mark" />
                {I18n.t('global.reset')}
              </button>
              <button className="btn btn-primary" onClick={() => this.setState({displayedModal: true})}>end</button>
            </div>
          )}
        </div>
        <Modal displayed={displayedModal}>
          <div className="checkout-modal">
            <Checkbox
              onChange={() => this.setState({ hasPromotion: !hasPromotion })}
              checked={hasPromotion}
            >
              {I18n.t('checkout.add-promotion')}
            </Checkbox>
            {hasPromotion && (
              <div className="price-promotion">
                <Select
                  clearable={false}
                  value={salePromotion.type ? salePromotion.type.key : null}
                  options={promotionTypes.map(({ key }) => ({
                    label: I18n.t(`promotion-types.${key}`),
                    value: key,
                  }))}
                  onChange={props => this.setState(props
                    ? ({
                      salePromotion: {
                        ...salePromotion,
                        type: promotionTypes.find(({ key }) => key === props.value),
                      }})
                    : ({salePromotion: {}}))}
                />
                {salePromotion.type &&
                  <Input
                    type="number"
                    step="any"
                    value={salePromotion.amount}
                    onChange={e => this.setState({
                      salePromotion: {
                        ...salePromotion,
                        amount: parseInt(e.target.value, 10),
                      }})}
                  />}
              </div>)}
            <div className="price-title">
              <h1>{I18n.t('checkout.total')}</h1>
              <h2>{formatPrice(this.getTotal())}</h2>
            </div>
            {change < 0 && (
              <div className="price-title">
                <h3>{I18n.t('checkout.left-to-pay')}</h3>
                <h4>{formatPrice(-change)}</h4>
              </div>)}
            <div>
              <ul>
                {paymentTypes.map(paymentType =>
                  this.renderPaymentType(paymentType))}
              </ul>
            </div>
            {change > 0 && (
              <div className="price-title">
                <h3>{I18n.t('checkout.change')}</h3>
                <h4>{formatPrice(change)}</h4>
              </div>
            )}
            <div
              className="payment-footer"
            >
              <button
                className="btn btn-link"
                onClick={() => this.setState({displayedModal: false})}
              >
                {I18n.t('global.cancel')}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => this.validateSale()}
                disabled={salePayments.reduce((a, b) => a + parseFloat(b.total), 0) < this.getVariantsTotal()}
              >
                {I18n.t('global.validate')}
              </button>
            </div>
          </div>
        </Modal>
        <div className="sales-history-link">
          <Link to="/sales">
            <i className="im im-history" />&nbsp;
            <span>Historique des ventes</span>
          </Link>
        </div>
      </PageContainer>
    )
  }
}

Checkout.propTypes = {
  storeId: PropTypes.string.isRequired,
}
