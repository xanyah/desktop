import React from 'react'
import PropTypes from 'prop-types'
import Collapsible from 'react-collapsible'
import { Translate } from 'react-redux-i18n'

import DataDetails from '../data-details'
import PageContainer from '../../containers/page-container'
import FormAttribute from '../../containers/form-attribute'
import { variantFormat, variantAttributeFormat, VariantType } from '../../types'
import VariantMovements from './variant-movements'

import './styles.scss'

export default class Variant extends React.Component {
  componentWillMount() {
    this.props.setPageName(this.props.selectedVariant.barcode)
    this.setState({
      newVariantAttribute: {},
    })
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  handleUpdateFieldNewVariantAttribute(attribute, value) {
    this.setState({
      newVariantAttribute: {
        ...this.state.newVariantAttribute,
        [attribute]: value,
      },
    })
  }

  render() {
    const {
      variantEditing,
      toggleVariant,
      selectedVariant,
      updateApiVariant,
    } = this.props
    return (
      <PageContainer>
        <DataDetails
          currentEntity={selectedVariant}
          editing={variantEditing}
          formattedData={variantFormat}
          toggleEdit={toggleVariant}
          type="variants"
          updateEntity={updateApiVariant}
        >
          <div>
            {this.renderVariantAttributesForm()}
            {this.renderVariantAttributesList()}
            {this.renderVariantMovements()}
          </div>
        </DataDetails>
      </PageContainer>
    )
  }

  renderVariantMovements() {
    const {
      openInventory,
      openSale,
      openShipping,
      selectedVariant,
    } = this.props
    return (
      <VariantMovements
        variantId={selectedVariant.id}
        openInventory={openInventory}
        openSale={openSale}
        openShipping={openShipping}
      />
    )
  }

  renderVariantAttributesList() {
    const {
      selectedVariant,
      toggleVariantAttribute,
      updateApiVariantAttribute,
    } = this.props
    if(!selectedVariant.variantAttributes)
      return null
    else
      return selectedVariant.variantAttributes.map(variantAttribute => {
        return (
          <DataDetails
            currentEntity={variantAttribute}
            editing={false}
            formattedData={variantAttributeFormat}
            toggleEdit={toggleVariantAttribute}
            type="variant-attributes"
            updateEntity={updateApiVariantAttribute}
          />
        )})
  }

  renderVariantAttributesForm() {
    const { newVariantAttribute } = this.state
    const { createApiVariantAttribute, selectedVariant } = this.props
    return (
      <Collapsible trigger={<h1>> Crée un nouveau dérivé</h1>}>
        <form
          className="variant-form"
          onSubmit={e=> {
            e.preventDefault()
            createApiVariantAttribute(
              {
                ...newVariantAttribute,
                variantId: selectedVariant.id,
              }
            )
          }}>

          <div className="row">
            <FormAttribute
              attribute="customAttribute"
              key="customAttribute"
              value={newVariantAttribute['customAttribute']}
              model="variant-attributes"
              type="entity"
              onUpdate={(attribute, value) =>
                this.handleUpdateFieldNewVariantAttribute(attribute, value)}
            />
            <FormAttribute
              attribute="value"
              key="value"
              value={newVariantAttribute['value']}
              model="variant-attributes"
              type="string"
              onUpdate={(attribute, value) =>
                this.handleUpdateFieldNewVariantAttribute(attribute, value)}
            />
          </div>

          <button className="btn-link btn-stand-alone">
            <Translate value='global.validate'/>
          </button>
        </form>
      </Collapsible>
    )
  }
}

Variant.propTypes = {
  createApiVariantAttribute: PropTypes.func,
  openInventory: PropTypes.func,
  openSale: PropTypes.func,
  openShipping: PropTypes.func,
  selectedVariant: PropTypes.shape(VariantType),
  setPageName: PropTypes.func,
  toggleVariant: PropTypes.func,
  toggleVariantAttribute: PropTypes.func,
  updateApiVariant: PropTypes.func,
  updateApiVariantAttribute: PropTypes.func,
  variantEditing: PropTypes.bool,
  variants: PropTypes.arrayOf(VariantType),
}

Variant.defaultProps = {
  createApiVariantAttribute: () => null,
  openInventory: () => null,
  openSale: () => null,
  openShipping: () => null,
  selectedVariant: {},
  setPageName: () => null,
  toggleVariant: () => null,
  toggleVariantAttribute: () => null,
  updateApiVariant: () => null,
  updateApiVariantAttribute: () => null,
  variantEditing: false,
  variants: [],
}
