import React from 'react'
import PropTypes from 'prop-types'
import { InventoryType, inventoryFormat } from '../../types'
import DataDetails from '../data-details'
import PageContainer from '../../containers/page-container'
import { getInventoryVariants } from '../../utils/api-helper'
import { Translate } from 'react-redux-i18n'

import './styles.scss'

export default class Inventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inventoryVariants: [],
    }
  }

  componentDidMount() {
    getInventoryVariants({inventoryId: this.props.selectedInventory.id})
      .then(({ data }) => this.setState({
        ...this.state,
        inventoryVariants: data,
      }))
  }

  componentWillMount() {
    this.props.setPageName('Inventory')
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  renderInventoryVariants() {
    const { inventoryVariants } = this.state

    return (
      <div className="inventory-variants">
        <label className="embed-table-title">Inventory Variants</label>
        <div className="embed-table">
          <div className="row header-row">
            <div className="column">
              <Translate value='models.variants.barcode'/>
            </div>
            <div className="column">
              <Translate value='models.products.title'/>
            </div>
            <div className="column">
              <Translate value='models.variants.quantity'/>
            </div>
          </div>
          {
            inventoryVariants.map(inventoryVariant => (
              <div className="row" key={inventoryVariant.id}>
                <div className="column productName">
                  {inventoryVariant.variant.barcode}
                </div>
                <div className="column variantName">
                  {inventoryVariant.variant.product.name}
                </div>
                <div className="column quantity">{inventoryVariant.quantity}</div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  render() {
    const {
      selectedInventory,
    } = this.props
    return (
      <PageContainer>
        <h1 className="data-details-title">
          <Translate value='models.inventories.title'/>
        </h1>
        <DataDetails
          currentEntity={selectedInventory}
          formattedData={inventoryFormat}
          type="inventories"
        />
        {this.renderInventoryVariants()}
      </PageContainer>
    )
  }
}

Inventory.propTypes = {
  selectedInventory: InventoryType,
  setPageName: PropTypes.func,
}

Inventory.defaultProps = {
  selectedInventory: {},
  setPageName: () => null,
}
