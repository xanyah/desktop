import React from 'react'
import { Translate } from 'react-redux-i18n'
import PropTypes from 'prop-types'
import { formatData } from '../../utils/data-helper'

import './styles.scss'

const ItemAttribute = ({ attribute, type, value, model }) => {
  return (
    (type == 'entity')
      ? (
        <div className="item-attribute">
          <label htmlFor={attribute}><Translate value={`models.${model}.${attribute}`} /></label>
          <div id={attribute}>{
            (value.name)
              ? formatData(value.name)
              : formatData(value.id)
          }
          </div>
        </div>
      )
      : (
        <div className="item-attribute">
          <label htmlFor={attribute}><Translate value={`models.${model}.${attribute}`} /></label>
          <div id={attribute}>{formatData(value)}</div>
        </div>
      )
  )
}

ItemAttribute.propTypes = {
  attribute: PropTypes.string,
  model: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

ItemAttribute.defaultProps = {
  attribute: '',
  model: '',
  type: '',
  value: '',
}

export default ItemAttribute
