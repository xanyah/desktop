import { useState } from 'react'
import PropTypes from 'prop-types'
import { PulseLoader } from 'react-spinners'
import { formatData } from '../../utils/data-helper'
import { getStatusClass } from '../../utils/status-helper'
import { secondaryTextColor } from '../../constants'
import { logo } from '../../images'
import { Trans, useTranslation } from 'react-i18next'
import { InputText } from '../ui'

const DataTable = ({
  data,
  columns,
  creation,
  creationFunction,
  loading,
  onItemView,
  searchEntity,
  type,
}) => {
  const [searchEntityQuery, setSearchEntityQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const { t } = useTranslation()

  const handleSearchEntity = (query) => {
    setSearchEntityQuery(query)
    searchEntity(query)
  }

  return (
    <div className={`data-table data-table-${type}`}>
      <div className="table">
        {searchEntity && (
          <div className="search-bar">
            <div className="search-bar-content">
              <i className="im im-magnifier" />
              <InputText
                className="search-input input-search"
                type="text"
                placeholder={t(`models.${type}.search`)}
                onChange={(e) => handleSearchEntity(e.target.value)}
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
                  <Trans i18nKey={`models.${type}.${column}`} />
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
                className={selected === row ? 'row selected' : 'row'}
                onClick={() => setSelected(row)}
              >
                {columns.map(
                  (column) =>
                    column !== 'status' && (
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
                    <Trans i18nKey={`models.${type}.open`} />
                  </button>
                </div>
                <div className="border" />
              </div>
            ))
          ) : (
            <div className="empty-state">
              <img src={logo} alt="logo" />
              <h1>
                <Trans i18nKey={`models.${type}.noData`} />
              </h1>
              {creation && (
                <button
                  className="btn-solid"
                  onClick={() =>
                    creationFunction ? creationFunction() : onItemView({})
                  }
                  type="button"
                >
                  <Trans i18nKey={`models.${type}.create`} />
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
              <Trans i18nKey={`models.${type}.create`} />
            </button>
          ) : (
            <button
              className="btn-primary data-table-create-btn"
              onClick={() => onItemView({})}
            >
              <Trans i18nKey={`models.${type}.create`} />
            </button>
          )}
        </div>
      )}
    </div>
  )
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
