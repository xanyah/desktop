import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const Input = ({ onChange, type, placeholder, value }) => (
  <input
    className={`input input-${type}`}
    onChange={onChange}
    type={type}
    placeholder={placeholder}
    value={value}
  />
)

Input.propTypes = {
  /**
   * Function to trigger on change
   */
  onChange: PropTypes.func,
  /**
   * Input placeholder
   */
  placeholder: PropTypes.string,
  /**
   * Input type
   */
  type: PropTypes.string,
  /**
   * Input value
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

Input.defaultProps = {
  onChange: () => {},
  placeholder: '',
  type: '',
  value: '',
}

export default Input
