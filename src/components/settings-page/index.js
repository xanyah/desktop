import React from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../page-container'

import { StoreType } from '../../types'

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
    ]
  }

  componentWillMount() {
    const { currentStore, getTvaSettings, updateField } = this.props
    updateField('step', this.steps[0].key)
    updateField('storeName', currentStore.name)
    updateField('tvaCountry', currentStore.country)
    updateField('tva', getTvaSettings('fr'))
  }

  renderGeneral() {
    const { currentStore, storeName, updateField, updateStore } = this.props
    return <form
      className="general"
      onSubmit={e => {
        e.preventDefault()
        updateStore({
          ...currentStore,
          name: storeName.trim(),
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
      <input
        className="input-text"
        required
        type="text"
        value="France"
      />
      <div>Taux de TVA: Normal: 20% - Intermédiaire: 10% - Réduit: 5.5% - Super-réduit: 2.1% - Parking: 0%</div>
      <button className="btn-link" type="submit">Save</button>
    </form>
  }

  renderCategories() {
    return <div>Categories</div>
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
  currentStore: PropTypes.objectOf(StoreType),
  getTvaSettings: PropTypes.func,
  step: PropTypes.string,
  storeName: PropTypes.string,
  updateField: PropTypes.func,
  updateStore: PropTypes.func,
}

Settings.defaultProps = {
  currentStore: {},
  getTvaSettings: () => null,
  step: '',
  storeName: '',
  updateField: () => null,
  updateStore: () => null,
}
