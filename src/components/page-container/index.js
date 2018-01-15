import React from 'react'
import { Translate } from 'react-redux-i18n'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getCurrentRoute, getParentRoute } from '../../utils/router-helper'


import './styles.scss'

const PageContainer = ({ children, location }) => {
  const currentRoute = getCurrentRoute(location.pathname)
  const parentRoute = getParentRoute(location.pathname)

  return (
    <div className="page-container">
      <div className="header">
        <div className="navigation">
          <img src={currentRoute.image} />
          {parentRoute
            && <Link className="breadcrumb inactive" to={parentRoute.path}>
              <Translate value={`routes.${parentRoute.key}`} />
            </Link>}
          {currentRoute
            && <div className="breadcrumb">
              <Translate value={`routes.${currentRoute.key}`} />
            </div>}
        </div>
        <div className="close">
          <Link to="/home">x</Link>
        </div>
      </div>
      <div className="content">
        {children}
      </div>
      <div className="footer"></div>
    </div>
  )
}

export default withRouter(PageContainer)

PageContainer.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object,
}

PageContainer.defaultProps = {
  children: null,
  location: {},
}

