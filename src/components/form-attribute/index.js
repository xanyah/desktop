import React from 'react'
import { Translate } from 'react-redux-i18n'
import PropTypes from 'prop-types'

import { getFormElement } from '../../utils/data-helper'

import './styles.scss'

const FormAttribute = (item) => (
  <div className="form-attribute">
    <label htmlFor={item.attribute}><Translate value={`models.${item.model}.${item.attribute}`} /></label>
    { getFormElement(item) }
  </div>
)

FormAttribute.propTypes = {
  attribute: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}

FormAttribute.defaultProps = {
  attribute: '',
  type: '',
  value: '',
}

export default FormAttribute
