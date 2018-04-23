import React from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../page-container'

import { StoreType, CategoryType, CustomAttributeType } from '../../types'
import CustomAttribute from './custom-attributes'

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
    const { currentStore, getCategories, updateField } = this.props
    updateField('country', currentStore.country)
    updateField('step', this.steps[0].key)
    updateField('storeName', currentStore.name)
    getCategories()
  }

  renderGeneral() {
    const { country, currentStore, storeName, updateField, updateStore } = this.props
    return <form
      className="general"
      onSubmit={e => {
        e.preventDefault()
        updateStore({
          ...currentStore,
          country: country,
          name: storeName,
        })
      }}
    >
      <input
        className="input-text"
        onChange={e => updateField('storeName', e.target.value)}
        required
        type="text"
        value={storeName}
      />
      <select
        className='select-locale'
        onChange={e => updateField('country', e.target.value)}
      >
        <option
          value="FR"
          selected={'FR' === country}
        >FR</option>
        <option
          value="EN"
          selected={'EN' === country}
        >EN</option>
      </select>
      <button className="btn-link" type="submit">Save</button>
    </form>
  }

  renderCategories() {
    const { categories } = this.props

    if(!categories.length)
      return <h3>Il n'y a aucune catégorie pour le moment !</h3>
    return (
      <div>
        <ul>
          {/* <Collapsible trigger={<h1>> Crée un nouveau dérivé</h1>}> */}
          { categories.map((category) => {
            return (!category.children.length)
              ? <li key={category.id}>{category.name}</li>
              : (
                <ul key={category.id}>
                  {category.children.map((child) => {
                    return <li key={child.id}>{child.name}</li>
                  })}
                </ul>
              )
          })}
        </ul>
      </div>
    )
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
  createApiCustomAttribute: PropTypes.func,
  currentStore: PropTypes.objectOf(StoreType),
  customAttributes: PropTypes.arrayOf(CustomAttributeType),
  getCategories: PropTypes.func,
  getCustomAttributes: PropTypes.func,
  openCustomAttribute: PropTypes.func,
  step: PropTypes.string,
  storeName: PropTypes.string,
  updateField: PropTypes.func,
  updateStore: PropTypes.func,
}

Settings.defaultProps = {
  categories: [],
  country: '',
  createApiCustomAttribute: () => null,
  currentStore: {},
  customAttributes: [],
  getCategories: () => null,
  getCustomAttributes: () => null,
  openCustomAttribute: () => null,
  step: 'general',
  storeName: '',
  updateField: () => null,
  updateStore: () => null,
}
