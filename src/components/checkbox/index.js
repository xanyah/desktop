import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const Checkbox = ({ children, checked, onChange }) => {
  return (
    <label className="input-checkbox">
      <input
        checked={checked}
        onChange={onChange}
        type="checkbox"
      />
      <i className={checked ? 'im im-check-square-i' : 'im im-square-o'} />
      {children}
    </label>)
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.string,
  onChange: PropTypes.func,
}

Checkbox.defaultProps = {
  checked: false,
  children: null,
  onChange: () => null,
}

export default Checkbox
