import React from 'react'
import { Translate } from 'react-redux-i18n'
import PropTypes from 'prop-types'

import FormAttribute from '../../../containers/form-attribute'
import { CustomAttributeType } from '../../../types'


import './styles.scss'

export default class CustomAttribute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newCustomAttribute: {},
    }
  }

  handleUpdate(attribute, value) {
    this.setState({
      newCustomAttribute: {
        ...this.state.newCustomAttribute,
        [attribute]: value,
      },
    })
  }

  renderCustomAttributesForm() {
    const { createApiCustomAttribute } = this.props
    const { newCustomAttribute } = this.state
    return (
      <form
        className="custom-attribute-form"
        key="form"
        onSubmit={e=> {
          e.preventDefault()
          createApiCustomAttribute(newCustomAttribute)
        }}
      >

        <FormAttribute
          attribute="name"
          inline
          key="name"
          value={newCustomAttribute['name']}
          model="custom_attributes"
          type="string"
          onUpdate={(attribute, value) => this.handleUpdate(attribute, value)}
        />

        <FormAttribute
          attribute="type"
          inline
          key="type"
          value={newCustomAttribute['type']}
          model="custom_attributes"
          type="type"
          onUpdate={(attribute, value) => this.handleUpdate(attribute, value)}
        />

        <button className="btn-solid" type="submit">
          <Translate value='global.validate'/>
        </button>
      </form>
    )
  }

  renderCustomAttributesList() {
    const { customAttributes } = this.props
    return (
      <div className="custom_attributes" key="table">
        <h1>Voir les attributs personnalisés</h1>

        <div className="custom-attribute-header">
          <div className="name">
            Nom
          </div>
          <div className="type">
            Type
          </div>
        </div>
        {customAttributes.map(customAttribute => (
          <div className="custom-attribute">
            <div className="name">
              {customAttribute.name}
            </div>
            <div className="type">
              {customAttribute.type}
            </div>
          </div>))}

      </div>
    )
  }

  render() {
    return (<div className="custom-attributes">
      {[
        this.renderCustomAttributesForm(),
        this.renderCustomAttributesList(),
      ]}
    </div>)
  }
}

CustomAttribute.propTypes = {
  createApiCustomAttribute: PropTypes.func,
  customAttributes: PropTypes.arrayOf(CustomAttributeType),
  getCustomAttributes: PropTypes.func,
  openCustomAttribute: PropTypes.func,
}

CustomAttribute.defaultProps = {
  createApiCustomAttribute: () =>  null,
  customAttributes: [],
  getCustomAttributes: () => null,
  openCustomAttribute: () => null,
}
