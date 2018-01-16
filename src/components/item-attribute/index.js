import React from 'react'
import { Translate } from 'react-redux-i18n'
import PropTypes from 'prop-types'
import { formatData } from '../../utils/data-helper'

import './styles.scss'

const ItemAttribute = ({ attribute, type, value }) => (
  <div className="item-attribute">
    <label htmlFor={attribute}><Translate value={`models.${type}.${attribute}`} /></label>
    <div id={attribute}>{formatData(value)}</div>
  </div>
)

ItemAttribute.propTypes = {
  attribute: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}

ItemAttribute.defaultProps = {
  attribute: '',
  type: '',
  value: '',
}

export default ItemAttribute
