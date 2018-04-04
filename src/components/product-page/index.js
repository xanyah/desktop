import React from 'react'
import PropTypes from 'prop-types'

import { productFormat, ProductType, VariantType } from '../../types'
import DataTable from '../data-table'
import DataDetails from '../data-details'
import PageContainer from '../../containers/page-container'
import FormAttribute from '../../containers/form-attribute'

import './styles.scss'

export default class Product extends React.Component {
  componentWillMount() {
    this.props.setPageName(this.props.selectedProduct.name)
    this.setState({
      newVariant: {},
    })
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  handleUpdateFieldNewVariant(attribute, value) {
    this.setState({
      newVariant: {
        ...this.state.newVariant,
        [attribute]: value,
      },
    })
  }

  render() {
    const {
      productEditing,
      selectedProduct,
      toggleProduct,
      updateApiProduct,
    } = this.props

    return (
      <PageContainer>
        <h1>{selectedProduct.name}</h1>
        <DataDetails
          currentEntity={selectedProduct}
          editing={productEditing}
          formattedData={productFormat}
          toggleEdit={toggleProduct}
          type="products"
          updateEntity={updateApiProduct}
        >
          {this.renderProductChildren()}
        </DataDetails>
      </PageContainer>
    )
  }

  renderProductChildren() {
    return [
      this.renderVariantsForm(),
      this.renderVariantsTable(),
    ]
  }

  renderVariantsTable() {
    const { openVariant, variants } = this.props
    return (
      <div className="variants">
        <h1>Voir les dérivés de ce produit</h1>

        <DataTable
          columns={['barcode', 'buyingPrice', 'provider', 'quantity', 'ratio', 'taxFreePrice']}
          data={variants}
          loading={false}
          onItemView={item => openVariant(item)}
          type="variants"
          create={false}
        />

      </div>
    )
  }

  renderVariantsForm() {
    const { newVariant } = this.state
    const { createApiVariant, selectedProduct } = this.props
    return (
      <form
        className="variant-form"
        onSubmit={e=> {
          e.preventDefault()
          createApiVariant({...newVariant, productId: selectedProduct.id})
        }}>

        <h1>Crée un nouveau dérivé</h1>

        <div className="row">
          <FormAttribute
            attribute="provider"
            key="provider"
            value={newVariant['provider']}
            model="variants"
            type="entity"
            onUpdate={(attribute, value) => this.handleUpdateFieldNewVariant(attribute, value)}
          />

          <FormAttribute
            attribute="buyingPrice"
            key="buyingPrice"
            value={newVariant['buyingPrice']}
            model="variants"
            type="number"
            onUpdate={(attribute, value) => this.handleUpdateFieldNewVariant(attribute, value)}
          />
        </div>

        <div className="row">
          <FormAttribute
            attribute="originalBarcode"
            key="originalBarcode"
            value={newVariant['originalBarcode']}
            model="variants"
            type="string"
            onUpdate={(attribute, value) => this.handleUpdateFieldNewVariant(attribute, value)}
          />

          <FormAttribute
            attribute="quantity"
            key="quantity"
            value={newVariant['quantity']}
            model="variants"
            type="number"
            onUpdate={(attribute, value) => this.handleUpdateFieldNewVariant(attribute, value)}
          />
        </div>

        <div className="row">
          <FormAttribute
            attribute="ratio"
            key="ratio"
            value={newVariant['ratio']}
            model="variants"
            type="number"
            onUpdate={(attribute, value) => this.handleUpdateFieldNewVariant(attribute, value)}
          />

          <FormAttribute
            attribute="taxFreePrice"
            key="taxFreePrice"
            value={newVariant['taxFreePrice']}
            model="variants"
            type="number"
            onUpdate={(attribute, value) => this.handleUpdateFieldNewVariant(attribute, value)}
          />
        </div>
        <button className="btn-link btn-stand-alone">Envoyer</button>
      </form>
    )
  }
}

Product.propTypes = {
  createApiVariant: PropTypes.func,
  openVariant: PropTypes.func,
  productEditing: PropTypes.bool,
  selectedProduct: PropTypes.shape(ProductType),
  setPageName: PropTypes.func,
  toggleProduct: PropTypes.func,
  updateApiProduct: PropTypes.func,
  variants: PropTypes.arrayOf(VariantType),
}

Product.defaultProps = {
  createApiVariant: () => null,
  openVariant: () => null,
  productEditing: false,
  selectedProduct: {},
  setPageName: () => null,
  toggleProduct: () => null,
  updateApiProduct: () => null,
  variants: [],
}
