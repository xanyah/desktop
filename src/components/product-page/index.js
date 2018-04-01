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
        {this.renderVariants(variants)}
      </PageContainer>
    )
  }


  renderVariants(variants) {
    variants.map(variant => (
      <div>{variant.barcode}</div>
    ))
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
