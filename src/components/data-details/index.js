import React from 'react'
import PropTypes from 'prop-types'
import ItemAttribute from '../item-attribute'

import './styles.scss'

const DataDetails = ({
  children,
  formattedData,
}) => (
  <div className="data-details">
    {formattedData.map((row, idx) => (
      <div className="row" key={idx}>
        {row.map(item => (
          <ItemAttribute
            attribute={item.attribute}
            key={item.attribute}
            value={item.value}
          />
        ))}
      </div>
    ))}
    {children}
  </div>
)

DataDetails.propTypes = {
  children: PropTypes.element,
  formattedData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.objectOf({
        attribute: PropTypes.string,
        value: PropTypes.string,
      })
    )
  ),
}

DataDetails.defaultProps = {
  children: null,
  formattedData: [],
}

export default DataDetails
