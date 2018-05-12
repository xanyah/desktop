import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-redux-i18n'
import { browserHistory } from 'react-router'

import { getShippingVariants, getInventoryVariants } from '../../../utils/api-helper'

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

    getShippingVariants({variantId: variantId})
      .then(({ data }) => this.setState({
        ...this.state,
        shippingVariantMovements: data.map(shippingVariant => ({...shippingVariant, type:'shippings'})),
      }))

    getInventoryVariants({variantId: variantId})
      .then(({ data }) => this.setState({
        ...this.state,
        inventoryVariantMovements: data.map(inventoryVariant => ({...inventoryVariant, type:'inventories'})),
      }))
  }

  render() {
    const {
      inventoryVariantMovements,
      saleVariantMovements,
      selected,
      shippingVariantMovements,
    } = this.state
    const variantMovements = [
      ...inventoryVariantMovements,
      ...saleVariantMovements,
      ...shippingVariantMovements,
    ]
    // TODO: Perte d'éléments lors du merge des tableaux ?
    console.log(variantMovements)
    return (
      <div className="variant-movements-content">
        <h3>Mouvements de l'article</h3>
        <div className="variant-movements-table">
          <div className="variant-movements-table-header">
            <div className="column"></div>
            <div className="column">Type</div>
            <div className="column">Date</div>
            <div className="column">Quantity</div>
          </div>
          <div className="variant-movements-table-body">
            {
              variantMovements.map((variantMovement, idx) => (
                <div
                  key={idx}
                  className={selected == variantMovement ? 'selected variant-movements-row' :  'variant-movements-row'}
                  onClick={() => this.setState({ selected: variantMovement })}>
                  <div className="data-row">
                    {
                      (variantMovement.type === 'shipping')
                        ? <div className="column column-success"><i class="im im-2x im-arrow-right"></i></div>
                        : (variantMovement.type === 'sale')
                          ? <div className="column column-danger"><i class="im im-2x im-arrow-left"></i></div>
                          : <div className="column column-primary"><i class="im im-2x im-arrow-right"></i></div>
                    }
                    <div className="column"><Translate value={`models.${variantMovement.type}.title`}/></div>
                    <div className="column">{variantMovement.updatedAt}</div>
                    {
                      (variantMovement.type === 'shipping')
                        ? <div className="column column-success">+ {variantMovement.quantity}</div>
                        : (variantMovement.type === 'sale')
                          ? <div className="column column-danger">- {variantMovement.quantity}</div>
                          : <div className="column column-primary">= {variantMovement.quantity}</div>
                    }
                  </div>
                  <button
                    className="link"
                    onClick={() => {
                      switch(variantMovements.type) {
                      case 'inventories': browserHistory.push('/inventories/');break
                      case 'sales': browserHistory.push('/sales/');break
                      case 'shippings': browserHistory.push('/shippings/');break
                      }
                    }}
                  >
                    ->
                  </button>
                  <div className="action">
                    <button
                      className="btn-primary"
                      onClick={() => {
                        switch(variantMovements.type) {
                        case 'inventories': browserHistory.push('/inventories/');break
                        case 'sales': browserHistory.push('/sales/');break
                        case 'shippings': browserHistory.push('/shippings/');break
                        }
                      }}
                    >
                      <Translate value={`models.${variantMovement.type}.open`} />
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

VariantMovements.propTypes = {
  // inventoryVariantMovements: PropTypes.array,
  // saleVariantMovements: PropTypes.array,
  // shippingVariantMovements: PropTypes.array,
  variantId: PropTypes.string,
}

VariantMovements.defaultProps = {
  // inventoryVariantMovements: [],
  // saleVariantMovements: [],
  // shippingVariantMovements: [],
  variantId: '',
}
