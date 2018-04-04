import React from 'react'
import Select from 'react-select'
import { Translate } from 'react-redux-i18n'
import PropTypes from 'prop-types'

import { isOfEntityType, getModel } from '../../utils/data-helper'

import './styles.scss'

const FormAttribute = item => {
  return (
    <div className="form-attribute">
      <label htmlFor={item.attribute}><Translate value={`models.${item.model}.${item.attribute}`} /></label>
      { getFormElement(item) }
    </div>
  )
}

const getFormElement = item => {
  switch(item.type) {
  case 'textarea':
    return (
      <textarea
        onChange={e =>item.onUpdate(item.attribute, e.target.value)}
        value={item.value}
        name={item.attribute}>
      </textarea>
    )
  case 'number':
    return (
      <input
        className="input-text"
        onChange={e => item.onUpdate(item.attribute, e.target.value)}
        value={item.value}
        name={item.attribute}
        type="number"
      />
    )
  case 'string':
    return (
      <input
        className="input-text"
        onChange={e => item.onUpdate(item.attribute, e.target.value)}
        value={item.value}
        name={item.attribute}
        type="text"
      />
    )
  //TODO Checkbox Type for boolean attribute (custom variant attribute)
  // case 'boolean':
  //   return (
  //     <input
  //       className="input-text"
  //       onChange={e => item.onUpdate(item.attribute, e.target.value)}
  //       // value={item.value}
  //       name={item.attribute}
  //       type="checkbox"
  //       // {(item.value) ? checked : null}
  //     />
  //   )
  case 'entity':
    return getSelect(item)
  }
}

const getSelect = item => {
  if(!isOfEntityType(item.attribute)) {
    return null
  }

  let model = getModel(item.attribute)

  return (
    <Select
      name="form-field-name"
      value={item.value.id}
      onChange={e => item.onUpdate(item.attribute, item[model].find(entity => entity.id === e.value))}
      options={item[model].map(entity => ({
        label: entity.name,
        value: entity.id,
      }))}
    />
  )
}

//TODO manage value can be object or string to avoid error in console
FormAttribute.propTypes = {
  attribute: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

FormAttribute.defaultProps = {
  attribute: '',
  type: '',
  value: '',
}

export default FormAttribute
