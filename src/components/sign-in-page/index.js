import React from 'react'
import PropTypes from 'prop-types'
import { Translate, I18n } from 'react-redux-i18n'

import Input from '../input'

import './styles.scss'

const SignIn = ({
  email,
  password,
  signIn,
  updateField,
}) => (
  <div key="sign-in" className="sign-in-page">
    <div className="container">
      <Input
        placeholder={I18n.t('sign-in-page.email')}
        type="email"
        value={email}
        onChange={e => updateField('email', e.target.value)}
      />
      <Input
        placeholder={I18n.t('sign-in-page.password')}
        type="password"
        value={password}
        onChange={e => updateField('password', e.target.value)}
      />
      <button className="btn-solid" onClick={signIn}>
        <Translate value='sign-in-page.sign-in'/>
      </button>
      <button className="btn-link">
        <Translate value='sign-in-page.forgotten-password'/>
      </button>
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
