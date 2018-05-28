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
        <h3><Translate value='models.inventories.title'/> <Translate value='models.variants.title'/></h3>
        <div className="row">
          {
            inventoryVariants.map(inventoryVariant => (
              <div className="data-row" key={inventoryVariant.id}>
                <div className="productName">
                  {inventoryVariant.variant.barcode}
                </div>
                <div className="variantName">
                  {inventoryVariant.variant.product.name}
                </div>
                <div className="quantity">
                  {inventoryVariant.quantity}
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
