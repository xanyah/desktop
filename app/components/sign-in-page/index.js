import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SignIn extends Component {
  render() {
    return (
      <div key="sign-in">
        <h2>Sign in</h2>
        <Link to="/home">to home</Link>
      </div>
    )
  }
}
