import React from 'react'
import PropTypes from 'prop-types'



const Checkbox = ({ children, checked, onChange }) => (
  <label className="input-checkbox">
    <input
      checked={checked}
      onChange={onChange}
      type="checkbox"
    />
    <i className={checked ? 'im im-check-square-i' : 'im im-square-o'} />
    {children}
  </label>)

Checkbox.propTypes = {
  /**
   * Is the checkbox checked ?
   */
  checked: PropTypes.bool,
  /**
   * Checkbox label
   */
  children: PropTypes.string,
  /**
   * Function to trigger on change
   */
  onChange: PropTypes.func,
}

Checkbox.defaultProps = {
  checked: false,
  children: null,
  onChange: () => null,
}

export default Checkbox
