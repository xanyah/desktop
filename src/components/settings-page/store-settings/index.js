import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { Translate } from 'react-redux-i18n'

import FormAttribute from '../../../containers/form-attribute'
import { countryList } from '../../../utils/country-helper'

import './styles.scss'

export default class StoreSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      updatedStore: {
        address: '',
        country: '',
        name: '',
      },
    }
  }

  componentDidMount() {
    this.props.getVatRates(this.props.currentStore.country)

    const { address, country, name } = this.props.currentStore
    this.setState({
      updatedStore: {
        address: address,
        country: country,
        name: name,
      },
    })
  }

  handleUpdateStore(attribute, value) {
    this.setState({
      updatedStore: {
        ...this.state.updatedStore,
        [attribute]: value,
      },
    })
  }

  renderVatRatesCountry() {
    const { vatRatesCountry } = this.props
    if(!vatRatesCountry)
      return null

    const {
      standardRate,
      reducedRate,
      reducedRateAlt,
      superReducedRate,
      parkingRate,
    } = this.props.vatRatesCountry

    return (
      <div className="vat-rates">
        <div className="title">TVA:</div>
        <div className="vat-rate">
          <div className="label">
            <Translate value='vat-rates.standard'/>:
          </div>
          <div className="rate"> {standardRate} %</div>
        </div>
        <div className="separator"> - </div>
        <div className="vat-rate">
          <div className="label">
            <Translate value='vat-rates.reduced_rate'/>:
          </div>
          <div className="rate"> {reducedRate} %</div>
        </div>
        <div className="separator"> - </div>
        <div className="vat-rate">
          <div className="label">
            <Translate value='vat-rates.reduced_rate_alt'/>:
          </div>
          <div className="rate"> {reducedRateAlt} %</div>
        </div>
        <div className="separator"> - </div>
        <div className="vat-rate">
          <div className="label">
            <Translate value='vat-rates.super_reduced_rate'/>:
          </div>
          <div className="rate"> {superReducedRate} %</div>
        </div>
        <div className="separator"> - </div>
        <div className="vat-rate">
          <div className="label">
            <Translate value='vat-rates.parking_rate'/>:
          </div>
          <div className="rate"> {parkingRate} %</div>
        </div>
      </div>
    )
  }

  render() {
    const { getVatRates, updateApiStore } = this.props
    const { updatedStore } = this.state

    return (
      <form
        className="store-settings-form"
        onSubmit={e=> {
          e.preventDefault()
          updateApiStore(updatedStore)
        }}>
        <div>
          <div className="row">
            <FormAttribute
              attribute="name"
              key="store"
              value={updatedStore['name']}
              model="stores"
              type="string"
              onUpdate={
                (attribute, value) => this.handleUpdateStore(attribute, value)
              }
            />
          </div>
          <div className="row">
            <FormAttribute
              attribute="address"
              key="store"
              value={updatedStore['address']}
              model="stores"
              type="string"
              onUpdate={
                (attribute, value) => this.handleUpdateStore(attribute, value)
              }
            />
          </div>
          <div className="row">
            <Select
              name="form-field-name"
              value={updatedStore['country']}
              onChange={e => {
                getVatRates(e.value)
                this.handleUpdateStore('country', e.value)
              }}
              options={countryList}
            />
            {this.renderVatRatesCountry()}
          </div>
        </div>
        <button className="btn-link btn-stand-alone" type="submit">
          <Translate value='global.validate'/>
        </button>
      </form>
    )
  }
}

StoreSettings.propTypes = {
  createApiCategorie: PropTypes.func,
  currentStore: PropTypes.object,
  getVatRates: PropTypes.func,
  updateApiStore: PropTypes.func,
  vatRatesCountry: PropTypes.object,
}

StoreSettings.defaultProps = {
  createApiCategorie: () => null,
  currentStore: {},
  getVatRates: () => null,
  updateApiStore: () => null,
  vatRatesCountry: {},
}
