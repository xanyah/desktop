import React from 'react'
import { Translate } from 'react-redux-i18n'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getCurrentRoute, getParentRoute } from '../../utils/router-helper'


import './styles.scss'

const PageContainer = ({
  children,
  currentNavigationStep,
  footerElements,
  location,
}) => {
  const currentRoute = getCurrentRoute(location.pathname)
  const parentRoute = getParentRoute(location.pathname)

  return (
    <div className="page-container">
      <div className="header">
        <div className="navigation">
          <img src={(currentRoute) ? currentRoute.image : null} />
          {parentRoute
            && [
              <Link
                className="breadcrumb inactive"
                key="link"
                to={parentRoute.path}
              >
                <Translate value={`routes.${parentRoute.key}`} />
              </Link>,
              <span key="arrow" className="arrow">></span>,
            ]}
          {currentRoute
            && <div className="breadcrumb">
              {currentNavigationStep.length > 0
                ? currentNavigationStep
                : <Translate value={`routes.${currentRoute.key}`} />}
            </div>}
        </div>
        <div className="close">
          <Link to="/home">
            <i className="im im-x-mark-circle-o" />
          </Link>
        </div>
      </div>
      <div className="content">
        {children}
      </div>
      <div className="footer">
        {footerElements}
      </div>
    </div>
  )
}

export default withRouter(PageContainer)

PageContainer.propTypes = {
  children: PropTypes.element,
  currentNavigationStep: PropTypes.string,
  footerElements: PropTypes.element,
  location: PropTypes.object,
}

PageContainer.defaultProps = {
  children: null,
  currentNavigationStep: '',
  footerElements: null,
  location: {},
}
