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
      loading,
      openProduct,
      products,
    } = this.props
    return (
      <PageContainer>
        <DataTable
          columns={['name', 'categoryId', 'createdAt']}
          data={products}
          loading={loading}
          onItemView={item => openProduct(item)}
          type="products"
        />
      </PageContainer>
    )
  }
}

Products.propTypes = {
  getProducts: PropTypes.func,
  loading: PropTypes.bool,
  openProduct: PropTypes.func,
  products: PropTypes.arrayOf(ProductType),
}

Products.defaultProps = {
  getProducts: () => null,
  loading: true,
  openProduct: () => null,
  products: [],
}
