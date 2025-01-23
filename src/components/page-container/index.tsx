import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { getCurrentRoute, getParentRoute } from "../../utils/router-helper";

import "./styles.scss";
import { Trans } from "react-i18next";

const PageContainer = ({ children, currentNavigationStep, footerElements }) => {
  const location = useLocation();
  const currentRoute = getCurrentRoute(location.pathname);
  const parentRoute = getParentRoute(location.pathname);

  return (
    <div className="page-container">
      <div className="header">
        <div className="navigation">
          <img src={currentRoute ? currentRoute.image : ''} />
          {parentRoute && [
            <Link
              className="breadcrumb inactive"
              key="link"
              to={parentRoute.path}
            >
              <Trans i18nKey={`routes.${parentRoute.key}`} />
            </Link>,
            <span key="arrow" className="arrow">
              {">"}
            </span>,
          ]}
          {currentRoute && (
            <div className="breadcrumb">
              {currentNavigationStep && currentNavigationStep.length > 0 ? (
                currentNavigationStep
              ) : (
                <Trans i18nKey={`routes.${currentRoute.key}`} />
              )}
            </div>
          )}
        </div>
        <div className="close">
          <Link to="/home">
            <i className="im im-x-mark-circle-o" />
          </Link>
        </div>
      </div>
      <div className="content">{children}</div>
      <div className="footer">{footerElements}</div>
    </div>
  );
};

export default PageContainer;

PageContainer.propTypes = {
  children: PropTypes.element,
  currentNavigationStep: PropTypes.string,
  footerElements: PropTypes.element,
};

PageContainer.defaultProps = {
  children: null,
  currentNavigationStep: "",
  footerElements: null,
};
