import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import './styles.scss'

import {test} from '../../../utils/import-helper'

class ImportFiles extends React.Component {
  render() {
    const { storeId } = this.props

    return (
      <div className="import-files">
        <button
          className="btn-primary"
          onClick={() => test(storeId)}
        >
          Click Here to download your file
        </button>
      </div>
    )
  }
}

ImportFiles.propTypes = {
  storeId: PropTypes.string.isRequired,
}

ImportFiles.defaultProps = {
}

const mapStateToProps = ({stores: { currentStore}}) => ({
  storeId: currentStore.id,
})

export default connect(mapStateToProps)(ImportFiles)
