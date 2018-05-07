import React from 'react'
import { Translate } from 'react-redux-i18n'
import PropTypes from 'prop-types'
import { PulseLoader } from 'react-spinners'

import { formatData } from '../../utils/data-helper'
import { secondaryTextColor } from '../../constants'
import { I18n } from 'react-redux-i18n'
import Input from '../input'

import './styles.scss'

class DataTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchEntityQuery: '',
      selected: null,
    }
  }

  handleSearchEntity= query => {
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

    const {
      searchEntityQuery,
      selected,
    } = this.state

    return (
      <div className="data-table">
        <div className="search-bar">
          {
            searchEntity &&
              <Input
                className="search-input input-search"
                type="text"
                placeholder={I18n.t(`models.${type}.search`)}
                onChange={e => this.handleSearchEntity(e.target.value)}
                value={searchEntityQuery}
              />
          }
        </div>
        <div className="header-row">
          {columns.map(column => (
            <div className="column" key={column}>
              <Translate value={`models.${type}.${column}`} />
            </div>
          ))}
        </div>
        <div className="rows-container">
          {
            (loading)
              ? (
                <div className='sweet-loading'>
                  <PulseLoader
                    color={secondaryTextColor}
                    loading={loading}
                  />
                </div>
              )
              : (
                (data.length)
                  ? (
                    data.map((row, idx) => (
                      <div
                        key={idx}
                        className={selected == row ? 'row selected' :  'row'}
                        onClick={() => this.setState({ selected: row })}
                      >
                        <div className="data-row">
                          {columns.map(column => (
                            <div className="column" key={idx + column}>
                              {formatData(row[column], column)}
                            </div>
                          ))}
                        </div>
                        <button
                          className="link"
                          onClick={() => onItemView(row)}
                        >
                          ->
                        </button>
                        <div className="action">
                          <button
                            className="btn-primary"
                            onClick={() => onItemView(row)}
                          >
                            <Translate value={`models.${type}.open`} />
                          </button>
                        </div>
                      </div>
                    ))
                  )
                  : (
                    <div>No data found !</div>
                  )
              )
          }
        </div>
        {creation && (
          (creationFunction)
            ? (
              <button
                className="btn-primary data-table-create-button"
                onClick={() => creationFunction()}
              >
                <Translate value={`models.${type}.create`} />
              </button>
            )
            : (
              <button
                className="btn-primary data-table-create-button"
                onClick={() => onItemView({})}
              >
                <Translate value={`models.${type}.create`} />
              </button>
            )
        )}
      </div>
    )
  }
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  creation: PropTypes.bool,
  creationFunction: PropTypes.func,
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
