import React from 'react'
import HomeLink from '../home-link'

import links from '../../constants/home-links'

import './styles.scss'

export default () => (
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
