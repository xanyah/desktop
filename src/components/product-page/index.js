import React from 'react'
import PropTypes from 'prop-types'
import { ProductType, VariantType } from '../../types'
import PageContainer from '../../containers/page-container'
import ItemAttribute from '../item-attribute'

import './styles.scss'

export default class Product extends React.Component {
  componentWillMount() {
    this.props.setPageName(this.props.selectedProduct.name)
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  render() {
    const {
      selectedProduct,
      variants,
    } = this.props
    return (
      <PageContainer>
        <h1>{ selectedProduct.name }</h1>

        <div className="products">
          <div className="info">
            <div className="row">
              <ItemAttribute
                attribute="manufacturer"
                key="manufacturer"
                value={selectedProduct.manufacturer.name}
                type="string"
              />
              <ItemAttribute
                attribute="category"
                key="category"
                value={selectedProduct.category.name}
                type="string"
              />
            </div>
          </div>
          {
            variants.map((variant, idx) => (
              <div>
                <div className="variant-head">
                  <h1>Variant #{idx}</h1>
                </div>

                <div className="info" key={idx}>
                  <div className="row">

                    <ItemAttribute
                      attribute="barcode"
                      key="barcode"
                      value={variant.barcode}
                      type="string"
                    />

                    <ItemAttribute
                      attribute="buyingPrice"
                      key="buyingPrice"
                      value={variant.buyingPrice}
                      type="string"
                    />

                    <ItemAttribute
                      attribute="originalBarcode"
                      key="originalBarcode"
                      value={variant.originalBarcode}
                      type="string"
                    />

                    <ItemAttribute
                      attribute="quantity"
                      key="quantity"
                      value={variant.quantity}
                      type="string"
                    />

                    <ItemAttribute
                      attribute="ratio"
                      key="ratio"
                      value={variant.ratio}
                      type="string"
                    />

                    <ItemAttribute
                      attribute="taxFreePrice"
                      key="taxFreePrice"
                      value={variant.taxFreePrice}
                      type="string"
                    />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </PageContainer>
    )
  }
}

Product.propTypes = {
  selectedProduct: PropTypes.shape(ProductType),
  setPageName: PropTypes.func,
  variants: PropTypes.arrayOf(VariantType),
}

Product.defaultProps = {
  selectedProduct: {},
  setPageName: () => null,
  variants: [],
}
