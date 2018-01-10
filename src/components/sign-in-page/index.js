import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'

export default class SignIn extends Component {
  render() {
    const {
      email,
      errors,
      loading,
      password,
      signIn,
      updateField,
    } = this.props
    return (
      <div key="sign-in" className="sign-in-page">
        <div className="container">
          <input type="email" value={email} onChange={e => updateField('email', e.target.value)} />
          <input type="password" value={password} onChange={e => updateField('password', e.target.value)} />
          <button onClick={signIn}>Sign in</button>
        </div>
      </div>
    )
  }
}
