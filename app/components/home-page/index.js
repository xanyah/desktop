import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <div key="home">
        <h2>Home</h2>
        <Link to="/sign-in">to sign in</Link>
      </div>
    )
  }
}
