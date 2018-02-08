import React from 'react'
import PropTypes from 'prop-types'
import ItemAttribute from '../item-attribute'
import FormAttribute from '../form-attribute'

import './styles.scss'

const DataDetails = ({
  children,
  editing,
  formattedData,
  toggleEdit,
  type,
}) => (
  <div className="data-details">
    {formattedData.map((row, idx) => (
      <div className="row" key={idx}>
        { row.map(item => (
          (item.editable && editing)
            ? <FormAttribute
              attribute={item.attribute}
              key={item.attribute}
              value={item.value}
              model={type}
              type={item.type}
            />
            : <ItemAttribute
              attribute={item.attribute}
              key={item.attribute}
              value={item.value}
              type={type}
            />
        ))}
      </div>
    ))}
    {children}

    {(editing)
      ? <button className="link" onClick={() => toggleEdit()}>Validate</button>
      : <button className="link" onClick={() => toggleEdit()}>Edit</button>
    }
  </div>
)

DataDetails.propTypes = {
  children: PropTypes.element,
  editing: PropTypes.bool,
  formattedData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.objectOf({
        attribute: PropTypes.string,
        value: PropTypes.string,
      })
    )
  ),
  toggleEdit: PropTypes.func,
  type: PropTypes.string,
}

DataDetails.defaultProps = {
  children: null,
  editing: false,
  formattedData: [],
  toggleEdit: () => null,
  type: '',
}

export default DataDetails
