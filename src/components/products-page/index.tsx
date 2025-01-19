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
      goToProductCreationPage,
      loading,
      openProduct,
      products,
    } = this.props
    return (
      <PageContainer>
        <DataTable
          columns={['name', 'category', 'manufacturer']}
          creationFunction={() => goToProductCreationPage()}
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
  goToProductCreationPage: PropTypes.func,
  loading: PropTypes.bool,
  openProduct: PropTypes.func,
  products: PropTypes.arrayOf(ProductType),
}

Products.defaultProps = {
  getProducts: () => null,
  goToProductCreationPage: false,
  loading: true,
  openProduct: () => null,
  products: [],
}
