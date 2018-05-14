import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

//TODO add eye icon  on password type to set visible or not password input
const Input = ({ className, onChange, placeholder, type, value }) => (
  (type === 'password') ? (
    <div>
      <input
        className={`input input-${type} ${className}`}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {/* <i
        className="im im-eye"
        onClick={e => {
          console.log(e)
          let passwordInput = document.getElementByClassName('.input-password')
          passwordInput.type = 'string'
        }}
      ></i> */}
    </div>
  )
    : (
      <input
        className={`input input-${type} ${className}`}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    )
)

Input.propTypes = {
  /**
  * Other classes on the input element
  */
  className: PropTypes.string,
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
  className: '',
  onChange: () => {},
  placeholder: '',
  type: '',
  value: '',
}

export default Input
