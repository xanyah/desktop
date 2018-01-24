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
    const { currentStore, updateField } = this.props
    updateField('step', this.steps[0].key)
    updateField('storeName', currentStore.name)
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
        onChange={e => updateField('storeName', e.target.value)}
        required
        type="text"
        value={storeName}
      />
      <button type="submit">
        Submit
      </button>
    </form>
  }

  renderCategories() {

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
  step: PropTypes.string,
  storeName: PropTypes.string,
  updateField: PropTypes.func,
  updateStore: PropTypes.func,
}

Settings.defaultProps = {
  currentStore: {},
  step: '',
  storeName: '',
  updateField: () => null,
  updateStore: () => null,
}
