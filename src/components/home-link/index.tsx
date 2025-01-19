import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Translate } from 'react-redux-i18n'

import './styles.scss'

const HomeLink = ({ image, string, url }) => (
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

HomeLink.propTypes = {
  image: PropTypes.string,
  string: PropTypes.string,
  url: PropTypes.string,
}

HomeLink.defaultProps = {
  image: '',
  string: '',
  url: '',
}

export default HomeLink
