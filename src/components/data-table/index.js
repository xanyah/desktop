import React from 'react'
import { Translate } from 'react-redux-i18n'
import PropTypes from 'prop-types'
import { PulseLoader } from 'react-spinners'

import { formatData } from '../../utils/data-helper'
import { secondaryTextColor } from '../../constants'
import { I18n } from 'react-redux-i18n'

import './styles.scss'

class DataTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: null,
    }
  }

  render() {
    //By default create = true (render button to create in dataDetails)
    const {
      data,
      columns,
      create,
      loading,
      onItemView,
      searchEntity,
      type,
    } = this.props
    return (
      <div className="data-table">
        <div className="search-bar">
          <input
            className="search-input input-search"
            type="string"
            placeholder={I18n.t(`models.${type}.search`)}
            onChange={e => searchEntity(e.target.value)}
          ></input>
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
                data.map((row, idx) => (
                  <div
                    key={idx}
                    className={this.state.selected == row ? 'row selected' :  'row'}
                    onClick={() => this.setState({ selected: row })}
                  >
                    <div className="data-row">
                      {columns.map(column => (
                        <div className="column" key={idx + column}>
                          {formatData(row[column], column)}
                        </div>
                      ))}
                    </div>
                    <button className="link" onClick={() => onItemView(row)}>
                      ->
                    </button>
                    <div className="action">
                      <button className="btn-primary" onClick={() => onItemView(row)}>
                        <Translate value={`models.${type}.open`} />
                      </button>
                    </div>
                  </div>
                ))
              )
          }
        </div>
        {create && (
          <button className="btn-primary data-table-create-button" onClick={() => onItemView({})}>
            <Translate value={`models.${type}.create`} />
          </button>
        )}
      </div>
    )
  }
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  create: PropTypes.bool,
  data: PropTypes.array,
  loading: PropTypes.bool,
  onItemView: PropTypes.func,
  searchEntity: PropTypes.func,
  type: PropTypes.string,
}

DataTable.defaultProps = {
  columns: [],
  create: true,
  data: [],
  loading: false,
  onItemView: () => null,
  searchEntity: () => null,
  type: '',
}

export default DataTable
