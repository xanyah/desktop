import React from 'react'
import PropTypes from 'prop-types'
import { ShippingType, shippingFormat } from '../../types'
import DataDetails from '../data-details'
import PageContainer from '../../containers/page-container'

import { getShippingVariants } from '../../utils/api-helper'

import './styles.scss'

export default class Shipping extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shippingVariants: [],
    }
  }

  componentWillMount() {
    this.props.setPageName(this.props.selectedShipping.name)
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  componentDidMount() {
    getShippingVariants({shippingId: this.props.selectedShipping.id})
      .then(({ data }) => this.setState({
        ...this.state,
        shippingVariants: data,
      }))
  }

  renderShippingVariants() {
    return (
      <div className="shipping-variants-table">
        <div className="shipping-variants-table-header">
          <div className="column column-product">Product</div>
          <div className="column column-barcode">Barcode</div>
          <div className="column column-quantity">Quantity</div>
        </div>
        <div className="shipping-variants-table-body">
          {
            this.state.shippingVariants.map(shippingVariant => (
              <div key={shippingVariant.id} className="shipping-variants-row">
                <div className="column column-product">
                  {shippingVariant.variant.product.name}
                </div>
                <div className="column column-barcode">
                  {shippingVariant.variant.barcode}
                </div>
                <div className="column column-quantity">
                  {shippingVariant.quantity}
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
      editing,
      toggleShipping,
      selectedShipping,
      updateApiShipping,
    } = this.props
    return (
      <PageContainer>
        <h1 className="data-details-title">{selectedShipping.name}</h1>
        <DataDetails
          currentEntity={selectedShipping}
          editing={editing}
          formattedData={shippingFormat}
          toggleEdit={toggleShipping}
          type="shippings"
          updateEntity={updateApiShipping}
        >
          {this.renderShippingVariants()}
        </DataDetails>
      </PageContainer>
    )
  }
}

Shipping.propTypes = {
  editing: PropTypes.bool,
  selectedShipping: ShippingType,
  setPageName: PropTypes.func,
  toggleShipping: PropTypes.func,
  updateApiShipping: PropTypes.func,
}

Shipping.defaultProps = {
  editing: false,
  selectedShipping: {},
  setPageName: () => null,
  toggleShipping: () => null,
  updateApiShipping: () => null,
}
