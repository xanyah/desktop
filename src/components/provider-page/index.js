import React from 'react'
import PropTypes from 'prop-types'
import { ProviderType, providerFormat } from '../../types'
import DataDetails from '../data-details'
// import DataTable from '../data-table'
import PageContainer from '../../containers/page-container'

import './styles.scss'

export default class Provider extends React.Component {
  componentWillMount() {
    const { setPageName, getProducts } = this.props
    setPageName(this.props.selectedProvider.name)
    getProducts({'providerId': this.props.selectedProvider.id})
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  render() {
    const {
      createApiProvider,
      editing,
      // loading,
      // openProduct,
      toggleProvider,
      // products,
      selectedProvider,
      updateApiProvider,
    } = this.props
    return (
      <PageContainer>
        <h1>{selectedProvider.name}</h1>
        <DataDetails
          createEntity={createApiProvider}
          currentEntity={selectedProvider}
          editing={editing}
          formattedData={providerFormat}
          toggleEdit={toggleProvider}
          type="providers"
          updateEntity={updateApiProvider}
        >
          {/* <DataTable
            columns={['name', 'category', 'manufacturer']}
            data={products}
            loading={loading}
            onItemView={item => openProduct(item)}
            type="products"
          /> */}
        </DataDetails>
      </PageContainer>
    )
  }
}

Provider.propTypes = {
  createApiProvider: PropTypes.func,
  editing: PropTypes.bool,
  getProducts: PropTypes.func,
  loading: PropTypes.bool,
  openProduct: PropTypes.func,
  products: PropTypes.func,
  selectedProvider: ProviderType,
  setPageName: PropTypes.func,
  toggleProvider: PropTypes.func,
  updateApiProvider: PropTypes.func,
}

Provider.defaultProps = {
  createApiProvider: () => null,
  editing: false,
  getProducts: () => {},
  loading: false,
  openProduct: () => {},
  products: () => {},
  selectedProvider: {},
  setPageName: () => null,
  toggleProvider: () => null,
  updateApiProvider: () => null,
}
