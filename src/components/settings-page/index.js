import React from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../page-container'

import { StoreType, CategoryType, CustomAttributeType } from '../../types'

import CustomAttribute from './custom-attributes'
import Categories from './categories'
import StoreSettings from './store-settings'

import './styles.scss'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.steps = [
      {
        key: 'general',
        render: () => this.renderGeneral(),
      },
      {
        key: 'categories',
        render: () => this.renderCategories(),
      },
      {
        key: 'custom-attributes',
        render: () => this.renderCustomAttributes(),
      },
    ]
  }

  componentWillMount() {
    const { updateField } = this.props
    updateField('step', this.steps[0].key)
  }

  renderGeneral() {
    const {
      currentStore,
      getVatRates,
      vatRatesCountry,
      updateApiStore,
    } = this.props

    return <StoreSettings
      currentStore={currentStore}
      getVatRates={getVatRates}
      updateApiStore={updateApiStore}
      vatRatesCountry={vatRatesCountry}
    />
  }

  renderCategories() {
    const {
      categories,
      createApiCategory,
      getCategories,
    } = this.props

    return <Categories
      createApiCategory={createApiCategory}
      categories={categories}
      getCategories={getCategories}
    />
  }

  renderCustomAttributes() {
    const {
      createApiCustomAttribute,
      customAttributes,
      openCustomAttribute,
      getCustomAttributes,
    } = this.props

    return <CustomAttribute
      createApiCustomAttribute={createApiCustomAttribute}
      customAttributes={customAttributes}
      getCustomAttributes={getCustomAttributes}
      openCustomAttribute={openCustomAttribute}
    />
  }

  render() {
    const { step, updateField } = this.props
    const currentStep = this.steps.find(s => s.key === step)
    return (
      <PageContainer>
        <div className="settings-page">
          <div className="side-navigation">
            {this.steps.map(s => (
              <button
                className={step === s.key ? 'active' : ''}
                key={s.key}
                onClick={() => updateField('step', s.key)}
              >
                {s.key}
              </button>
            ))}
          </div>
          <div className="content">
            {currentStep ? currentStep.render() : null}
          </div>
        </div>
      </PageContainer>
    )
  }
}

Settings.propTypes = {
  categories: PropTypes.arrayOf(CategoryType),
  country: PropTypes.string,
  createApiCategory: PropTypes.func,
  createApiCustomAttribute: PropTypes.func,
  currentStore: PropTypes.objectOf(StoreType),
  customAttributes: PropTypes.arrayOf(CustomAttributeType),
  getCategories: PropTypes.func,
  getCustomAttributes: PropTypes.func,
  getVatRates: PropTypes.func,
  openCustomAttribute: PropTypes.func,
  step: PropTypes.string,
  storeName: PropTypes.string,
  updateApiStore: PropTypes.func,
  updateField: PropTypes.func,
  vatRatesCountry: PropTypes.object,
}

Settings.defaultProps = {
  categories: [],
  country: '',
  createApiCategory: () => null,
  createApiCustomAttribute: () => null,
  currentStore: {},
  customAttributes: [],
  getCategories: () => null,
  getCustomAttributes: () => null,
  getVatRates: () => null,
  openCustomAttribute: () => null,
  step: 'general',
  storeName: '',
  updateApiStore: () => null,
  updateField: () => null,
  vatRatesCountry: {},
}
