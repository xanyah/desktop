import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const SignIn = ({
  email,
  password,
  signIn,
  updateField,
}) => (
  <div key="sign-in" className="sign-in-page">
    <div className="container">
      <input type="email" value={email} onChange={e => updateField('email', e.target.value)} />
      <input type="password" value={password} onChange={e => updateField('password', e.target.value)} />
      <button onClick={signIn}>Sign in</button>
    </div>
  </div>
)

SignIn.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  signIn: PropTypes.func,
  updateField: PropTypes.func,
}

SignIn.defaultProps = {
  email: '',
  password: '',
  signIn: () => null,
  updateField: () => null,
}

export default SignIn
