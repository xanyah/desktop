import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Translate } from 'react-redux-i18n'

import './styles.scss'

export default ({ image, string, url }) => (
  <div className="home-link">
    <Link className="link" to={url}>
      <img src={image} className="image" />
      <div className="description">
        <h2>
          <Translate value={`home-link.${string}.title`} />
        </h2>
        <h3>
          <Translate value={`home-link.${string}.subtitle`} />
        </h3>
      </div>
    </Link>
  </div>
)
