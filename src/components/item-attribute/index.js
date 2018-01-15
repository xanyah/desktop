import React from 'react'
import PropTypes from 'prop-types'
import { formatData } from '../../utils/data-helper'

import './styles.scss'

const ItemAttribute = ({ attribute, value }) => (
  <div className="item-attribute">
    <label for={attribute}>{attribute}</label>
    <div id={attribute}>{formatData(value)}</div>
  </div>
)

ItemAttribute.propTypes = {
  attribute: PropTypes.string,
  value: PropTypes.string,
}

ItemAttribute.defaultProps = {
  attribute: '',
  value: '',
}

export default ItemAttribute
