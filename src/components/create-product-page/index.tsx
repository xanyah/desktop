import React from 'react'
import PropTypes from 'prop-types'
import FormAttribute from '../../containers/form-attribute'


import { productFormat } from '../../types'

import { Translate } from 'react-redux-i18n'

import './styles.scss'

export default class CreateProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newProduct: {},
      newVariant: {},
    }
  }

  handleUpdateProduct(attribute, value) {
    this.setState({
      newProduct: {
        ...this.state.newProduct,
        [attribute]: value,
      },
    })
  }

  handleUpdateVariant(attribute, value) {
    this.setState({
      newVariant: {
        ...this.state.newVariant,
        [attribute]: value,
      },
    })
  }

  getVariantsFormAttribute() {
    const { newVariant } = this.state

    return (
      <div>
        <div className="row">
          <FormAttribute
            attribute="provider"
            key="provider"
            value={newVariant['provider']}
            model="variants"
            type="entity"
            onUpdate={(attribute, value) =>
              this.handleUpdateVariant(attribute, value)}
          />

          <FormAttribute
            attribute="buyingPrice"
            key="buyingPrice"
            value={newVariant['buyingPrice']}
            model="variants"
            type="number"
            onUpdate={(attribute, value) =>
              this.handleUpdateVariant(attribute, value)}
          />
        </div>

        <div className="row">
          <FormAttribute
            attribute="originalBarcode"
            key="originalBarcode"
            value={newVariant['originalBarcode']}
            model="variants"
            type="string"
            onUpdate={(attribute, value) =>
              this.handleUpdateVariant(attribute, value)}
          />

          <FormAttribute
            attribute="ratio"
            key="ratio"
            value={newVariant['ratio']}
            model="variants"
            type="number"
            onUpdate={(attribute, value) =>
              this.handleUpdateVariant(attribute, value)}
          />
        </div>

        <div className="row">
          <FormAttribute
            attribute="taxFreePrice"
            key="taxFreePrice"
            value={newVariant['taxFreePrice']}
            model="variants"
            type="number"
            onUpdate={(attribute, value) =>
              this.handleUpdateVariant(attribute, value)}
          />
        </div>
      </div>
    )
  }

  render() {
    const {
      children,
      createApiProduct,
      type,
    } = this.props
    const { newProduct, newVariant } = this.state

    return (
        <div className={`data-details data-details-${type}`}>
          <div className="info">
            <form
              onSubmit={e => {
                e.preventDefault()
                createApiProduct(newProduct, newVariant)
              }}>

              {productFormat.map((row, idx) => (
                <div className="row" key={idx}>
                  { row.map(item => (
                    (item.editable)
                      &&
                      <FormAttribute
                        attribute={item.attribute}
                        key={item.attribute}
                        value={newProduct[item.attribute]}
                        model="products"
                        type={item.type}
                        onUpdate={(attribute, value) =>
                          this.handleUpdateProduct(attribute, value)}
                      />
                  ))}
                </div>
              ))}

              { this.getVariantsFormAttribute() }

              {
                (
                  <button
                    className="btn-link btn-stand-alone"
                    key="btn-submit"
                  >
                    <Translate value={'data-details.form.buttons.create'}/>
                  </button>
                )
              }
            </form>
          </div>
          <div className="children">
            {children}
          </div>
        </div>
    )
  }
}

CreateProduct.propTypes = {
  children: PropTypes.element,
  createApiProduct: PropTypes.func,
  currentEntity: PropTypes.object,
  editing: PropTypes.bool,
  formChildren: PropTypes.element,
  formattedData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.objectOf({
        attribute: PropTypes.string,
        editable: PropTypes.bool,
        type: PropTypes.string,
      })
    )
  ),
  toggleEdit: PropTypes.func,
  type: PropTypes.string,
  updateEntity: PropTypes.func,
}

CreateProduct.defaultProps = {
  children: null,
  createApiProduct: () => null,
  currentEntity: {},
  editing: false,
  formChildren: null,
  formattedData: [],
  toggleEdit: () => null,
  type: '',
  updateEntity: () => null,
}
