import React from 'react'
import PropTypes from 'prop-types'
import { ProductType } from '../../types'
import DataTable from '../data-table'
import PageContainer from '../page-container'

import './styles.scss'

export default class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {
      openProduct,
      products,
    } = this.props
    return (
      <PageContainer>
        <DataTable
          columns={['name', 'categoryId', 'createdAt']}
          data={products}
          onItemView={item => openProduct(item)}
          type="products"
        />
      </PageContainer>
    )
  }
}

Products.propTypes = {
  getProducts: PropTypes.func,
  openProduct: PropTypes.func,
  products: PropTypes.arrayOf(ProductType),
}

Products.defaultProps = {
  getProducts: () => null,
  openProduct: () => null,
  products: [],
}
