import React from 'react'
import PropTypes from 'prop-types'
import { ManufacturerType, manufacturerFormat } from '../../types'
import DataDetails from '../data-details'
import DataTable from '../data-table'
import PageContainer from '../../containers/page-container'

import './styles.scss'

export default class Manufacturer extends React.Component {
  componentWillMount() {
    const { setPageName, getProducts } = this.props
    setPageName(this.props.selectedManufacturer.name)
    getProducts({'manufacturerId': this.props.selectedManufacturer.id})
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  render() {
    const {
      createApiManufacturer,
      editing,
      loading,
      openProduct,
      toggleManufacturer,
      products,
      selectedManufacturer,
      updateApiManufacturer,
    } = this.props
    return (
      <PageContainer>
        <h1 className="data-details-title">{selectedManufacturer.name}</h1>
        <DataDetails
          createEntity={createApiManufacturer}
          currentEntity={selectedManufacturer}
          editing={editing}
          formattedData={manufacturerFormat}
          toggleEdit={toggleManufacturer}
          type="manufacturers"
          updateEntity={updateApiManufacturer}
        >
          {
            (selectedManufacturer.id)
              ? (
                <DataTable
                  columns={['name', 'category', 'manufacturer']}
                  data={products}
                  loading={loading}
                  onItemView={item => openProduct(item)}
                  type="products"
                />
              )
              : (
                null
              )
          }
        </DataDetails>
      </PageContainer>
    )
  }
}

Manufacturer.propTypes = {
  createApiManufacturer: PropTypes.func,
  editing: PropTypes.bool,
  getProducts: PropTypes.func,
  loading: PropTypes.bool,
  openProduct: PropTypes.func,
  products: PropTypes.func,
  selectedManufacturer: ManufacturerType,
  setPageName: PropTypes.func,
  toggleManufacturer: PropTypes.func,
  updateApiManufacturer: PropTypes.func,
}

Manufacturer.defaultProps = {
  createApiManufacturer: () => null,
  editing: false,
  getProducts: () => {},
  loading: false,
  openProduct: () => {},
  products: () => {},
  selectedManufacturer: {},
  setPageName: () => null,
  toggleManufacturer: () => null,
  updateApiManufacturer: () => null,
}
