import PropTypes from 'prop-types'
import { formatData } from '../../utils/data-helper'


import { Trans } from 'react-i18next'

const ItemAttribute = ({ attribute, type, value, model }) => {
  return (
    (type == 'entity')
      ? (
        <div className="item-attribute">
          <label htmlFor={attribute}>
            <Trans i18nKey={`models.${model}.${attribute}`}/>
          </label>
          <div id={attribute}>{
            (value.name)
              ? formatData(value.name)
              : (value.firstname)
                ? formatData(value.firstname)
                : formatData(value.id)
          }
          </div>
        </div>
      )
      : (
        <div className="item-attribute">
          <label htmlFor={attribute}>
            <Trans i18nKey={`models.${model}.${attribute}`} />
          </label>
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
