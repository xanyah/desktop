import React from 'react'
import PropTypes from 'prop-types'



const Modal = ({ children, displayed }) => (
  <div className={displayed ? 'modal' : 'modal hidden'}>
    <div className="modal-content">{children}</div>
  </div>
)

Modal.propTypes = {
  children: PropTypes.element,
  displayed: PropTypes.bool,
}

Modal.defaultProps = {
  children: <div></div>,
  displayed: false,
}

export default Modal
