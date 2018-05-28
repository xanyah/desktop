import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-redux-i18n'

import {
  getInventoryVariants,
  getSales,
  getShippingVariants,
} from '../../../utils/api-helper'

import { formatData } from '../../../utils/data-helper'

import './styles.scss'

export default class VariantMovements extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inventoryVariantMovements: [],
      saleVariantMovements: [],
      selected: null,
      shippingVariantMovements: [],
    }
  }

  componentDidMount() {
    const { variantId } = this.props

    getInventoryVariants({variantId: variantId})
      .then(({ data }) => this.setState({
        ...this.state,
        inventoryVariantMovements: data.map(
          inventoryVariant => ({...inventoryVariant, type:'inventories'})
        ),
      }))

    getSales({variantId: variantId})
      .then(({ data }) => this.setState({
        ...this.state,
        saleVariantMovements: data.map(
          saleVariant => ({...saleVariant, type:'sales'})
        ),
      }))

    getShippingVariants({variantId: variantId})
      .then(({ data }) => this.setState({
        ...this.state,
        shippingVariantMovements: data.map(
          shippingVariant => ({...shippingVariant, type:'shippings'})
        ),
      }))

      //loading = true when all finished
  }

  render() {
    const {
      inventoryVariantMovements,
      saleVariantMovements,
      shippingVariantMovements,
    } = this.state

    const variantMovements = [
      ...inventoryVariantMovements,
      ...saleVariantMovements,
      ...shippingVariantMovements,
    ]

    // TODO: Sort By Date (Which date to take care of !!!!)

    return (
      <div className="variant-movements-content">
        <div className="section-title">
          <Translate value='models.variants.variant-movements.title'/>
        </div>
        <div className="variant-movements-table">
          <div className="variant-movements-table-header">
            <div className="column">
              <Translate value='models.variants.variant-movements.type'/>
            </div>
            <div className="column">
              <Translate value='models.variants.variant-movements.date'/>
            </div>
            <div className="column">
              <Translate value='models.variants.variant-movements.quantity'/>
            </div>
          </div>
          <div className="variant-movements-table-body">
            {
              variantMovements.map((variantMovement, idx) => {
                switch(variantMovement.type) {
                case 'inventories': return this.renderInventoryRow(variantMovement, idx)
                case 'sales': return this.renderSaleRow(variantMovement, idx)
                case 'shippings': return this.renderShippingRow(variantMovement, idx)
                }
              })
            }
          </div>
        </div>
      </div>
    )
  }

  renderInventoryRow(row, idx) {
    const { selected } = this.state
    const { openInventory } = this.props

    return (
      <div
        key={idx}
        className={selected == row ? 'selected variant-movements-row' :  'variant-movements-row'}
        onClick={() => this.setState({ selected: row })}>
        <div className="data-row">
          <div className="column-arrow column-primary"><i className="im im-arrow-right"></i></div>
          <div className="column"><Translate value='models.inventories.title'/></div>
          <div className="column">{formatData(row.createdAt)}</div>
          <div className="column column-primary">= {row.quantity}</div>
        </div>
        <button
          className="link"
          onClick={() => { openInventory(row) }}
        >
          <i className="im im-arrow-right" />
        </button>
        <div className="action">
          <button
            className="btn-primary"
            onClick={() => { openInventory(row) }}
          >
            <Translate value='models.inventories.open' />
          </button>
        </div>
      </div>
    )
  }

  renderSaleRow(row, idx) {
    const { selected } = this.state
    const { openSale } = this.props
    // const { variantId } = this.props

    // TODO: getQuantity by variantId in saleVariants

    return (
      <div
        key={idx}
        className={selected == row ? 'selected variant-movements-row' :  'variant-movements-row'}
        onClick={() => this.setState({ selected: row })}>
        <div className="data-row">
          <div className="column-arrow column-danger"><i className="im im-arrow-left"></i></div>
          <div className="column"><Translate value='models.sales.title'/></div>
          <div className="column">{formatData(row.createdAt)}</div>
          <div className="column column-danger">- {row.saleVariants[0].quantity}</div>
        </div>
        <button
          className="link"
          onClick={() => { openSale(row) }}
        >
          <i className="im im-arrow-right" />
        </button>
        <div className="action">
          <button
            className="btn-primary"
            onClick={() => { openSale(row) }}
          >
            <Translate value='models.sales.open' />
          </button>
        </div>
      </div>
    )
  }

  renderShippingRow(row, idx) {
    const { selected } = this.state
    const { openShipping } = this.props

    return (
      <div
        key={idx}
        className={selected == row ? 'selected variant-movements-row' :  'variant-movements-row'}
        onClick={() => this.setState({ selected: row })}>
        <div className="data-row">
          <div className="column-arrow column-success"><i className="im im-arrow-right"></i></div>
          <div className="column"><Translate value='models.shippings.title'/></div>
          <div className="column">{formatData(row.createdAt)}</div>
          <div className="column column-success">+ {row.quantity}</div>
        </div>
        <button
          className="link"
          onClick={() => { openShipping(row) }}
        >
          <i className="im im-arrow-right" />
        </button>
        <div className="action">
          <button
            className="btn-primary"
            onClick={() => { openShipping(row) }}
          >
            <Translate value='models.shippings.open' />
          </button>
        </div>
      </div>
    )
  }
}

VariantMovements.propTypes = {
  openInventory: PropTypes.func,
  openSale: PropTypes.func,
  openShipping: PropTypes.func,
  variantId: PropTypes.string,
}

VariantMovements.defaultProps = {
  openInventory: () => null,
  openSale: () => null,
  openShipping: () => null,
  variantId: '',
}
