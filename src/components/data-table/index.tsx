import React from 'react'
import { I18n, Translate } from 'react-redux-i18n'
import PropTypes from 'prop-types'
import { PulseLoader } from 'react-spinners'

import { formatData } from '../../utils/data-helper'
import { getStatusClass } from '../../utils/status-helper'
import { secondaryTextColor } from '../../constants'
import Input from '../input'

import './styles.scss'
import { logo } from '../../images'

class DataTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchEntityQuery: '',
      selected: null,
    }
  }

  handleSearchEntity = (query) => {
    this.setState({
      ...this.state,
      searchEntityQuery: query,
    })
    this.props.searchEntity(query)
  }

  render() {
    const {
      data,
      columns,
      creation,
      creationFunction,
      loading,
      onItemView,
      searchEntity,
      type,
    } = this.props

    const { searchEntityQuery, selected } = this.state

    return (
      <div className={`data-table data-table-${type}`}>
        <div className="table">
          {searchEntity && (
            <div className="search-bar">
              <div className="search-bar-content">
                <i className="im im-magnifier" />
                <Input
                  className="search-input input-search"
                  type="text"
                  placeholder={I18n.t(`models.${type}.search`)}
                  onChange={(e) => this.handleSearchEntity(e.target.value)}
                  value={searchEntityQuery}
                />
              </div>
            </div>
          )}
          <div className="header-row">
            {columns.map(
              (column) =>
                column !== 'status' && (
                  <div className={`column column-${column}`} key={column}>
                    <Translate value={`models.${type}.${column}`} />
                  </div>
                )
            )}
          </div>
          <div className="rows-container">
            {loading ? (
              <div className="sweet-loading">
                <PulseLoader color={secondaryTextColor} loading={loading} />
              </div>
            ) : data.length && data.length > 0 ? (
              data.map((row, idx) => (
                <div
                  key={idx}
                  className={selected == row ? 'row selected' : 'row'}
                  onClick={() => this.setState({ selected: row })}
                >
                  {columns.map(
                    (column) =>
                      column != 'status' && (
                        <div
                          className={`column column-${column}`}
                          key={idx + column}
                        >
                          {formatData(row[column], column)}
                        </div>
                      )
                  )}
                  {columns.includes('status') && (
                    <div className="status">
                      <div
                        className={`sticker-${getStatusClass(row, type)}`}
                      ></div>
                    </div>
                  )}
                  <button className="link" onClick={() => onItemView(row)}>
                    <i className="im im-arrow-right"></i>
                  </button>
                  <div className="action">
                    <button
                      className="btn-primary"
                      onClick={() => onItemView(row)}
                    >
                      <Translate value={`models.${type}.open`} />
                    </button>
                  </div>
                  <div className="border" />
                </div>
              ))
            ) : (
              <div className="empty-state">
                <img src={logo} />
                <h1>
                  <Translate value={`models.${type}.noData`} />
                </h1>
                {creation && (
                  <button
                    className="btn-solid"
                    onClick={() =>
                      creationFunction ? creationFunction() : onItemView({})
                    }
                    type="button"
                  >
                    <Translate value={`models.${type}.create`} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {creation && (
          <div className="data-table-create-btn-group">
            {creationFunction ? (
              <button
                className="btn-primary data-table-create-btn"
                onClick={() => creationFunction()}
              >
                <Translate value={`models.${type}.create`} />
              </button>
            ) : (
              <button
                className="btn-primary data-table-create-btn"
                onClick={() => onItemView({})}
              >
                <Translate value={`models.${type}.create`} />
              </button>
            )}
          </div>
        )}
      </div>
    )
  }
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  creation: PropTypes.bool,
  creationFunction: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  data: PropTypes.array,
  loading: PropTypes.bool,
  onItemView: PropTypes.func,
  searchEntity: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  type: PropTypes.string,
}

DataTable.defaultProps = {
  columns: [],
  creation: true,
  creationFunction: false,
  data: [],
  loading: false,
  onItemView: () => null,
  searchEntity: false,
  type: '',
}

export default DataTable
