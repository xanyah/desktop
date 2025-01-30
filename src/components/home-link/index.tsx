import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


import { Trans } from "react-i18next";

const HomeLink = ({ image, string, url }) => (
  <div className="home-link">
    <Link className="link" to={url}>
      <img src={image} className="image" />
      <div className="description">
        <h2>
          <Trans i18nKey={`home-link.${string}.title`} />
        </h2>
        <h3>
          <Trans i18nKey={`home-link.${string}.subtitle`} />
        </h3>
      </div>
    </Link>
  </div>
);

HomeLink.propTypes = {
  image: PropTypes.string,
  string: PropTypes.string,
  url: PropTypes.string,
};

HomeLink.defaultProps = {
  image: "",
  string: "",
  url: "",
};

export default HomeLink;
