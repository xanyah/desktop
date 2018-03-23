import React from 'react'
import { Translate } from 'react-redux-i18n'
import PropTypes from 'prop-types'
import { PulseLoader } from 'react-spinners'

import { formatData } from '../../utils/data-helper'

import './styles.scss'

class DataTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: null,
    }
  }

  render() {
    const {
      data,
      columns,
      loading,
      onItemView,
      type,
    } = this.props
    return (
      <div className="data-table">
        <div className="header-row">
          {columns.map(column => (
            <div className="column" key={column}>
              <Translate value={`models.${type}.${column}`} />
            </div>
          ))}
        </div>
        {
          (loading)
            ? (
              <div className='sweet-loading'>
                <PulseLoader
                  color={'#9FA8DA'}
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
                    <button className="btn-link" onClick={() => onItemView(row)}>
                      <Translate value={`models.${type}.open`} />
                    </button>
                  </div>
                </div>
              ))
            )
        }
        <button className="btn-link" onClick={() => onItemView({})}>
          <Translate value={`models.${type}.create`} />
        </button>
      </div>
    )
  }
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.array,
  loading: PropTypes.bool,
  onItemView: PropTypes.func,
  type: PropTypes.string,
}

DataTable.defaultProps = {
  columns: [],
  data: [],
  loading: false,
  onItemView: () => null,
  type: '',
}

export default DataTable
