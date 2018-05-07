import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-redux-i18n'

import PageContainer from '../page-container'
import CustomAttribute from './custom-attributes'
import Categories from './categories'
import StoreSettings from './store-settings'
import { StoreType, CategoryType, CustomAttributeType } from '../../types'

import './styles.scss'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.steps = [
      {
        key: 'store-settings',
        render: () => this.renderStoreSettings(),
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

  renderStoreSettings() {
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
      loadingCategory,
    } = this.props

    return <Categories
      createApiCategory={createApiCategory}
      categories={categories}
      getCategories={getCategories}
      loading={loadingCategory}
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
                <Translate value={`settings-page.side-navigation.${s.key}`}/>
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
  loadingCategory: PropTypes.bool,
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
  loadingCategory: false,
  openCustomAttribute: () => null,
  step: 'general',
  storeName: '',
  updateApiStore: () => null,
  updateField: () => null,
  vatRatesCountry: {},
}
