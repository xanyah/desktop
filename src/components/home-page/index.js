import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HomeLink from '../home-link'

import links from '../../constants/home-links'

import './styles.scss'

export default class Home extends Component {
  render() {
    return (
      <div key="home" className="home-page">
        <div className="links-container">
          {links.map(link => (
            <HomeLink
              key={link.key}
              image={link.image}
              string={link.key}
              url={link.url}
            />
          ))}
        </div>
      </div>
    )
  }
}
