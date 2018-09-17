import React from 'react'

import './styles.scss'

import {test} from '../../../utils/import-helper'

export default class ImportFiles extends React.Component {
  render() {
    return (
      <div className="import-files">
        <button
          className="btn-primary"
          onClick={() => test()}
        >
          Click Here to download your file
        </button>
      </div>
    )
  }
}

ImportFiles.propTypes = {
}

ImportFiles.defaultProps = {
}
