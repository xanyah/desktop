import React from 'react'
import PropTypes from 'prop-types'
import { ManufacturerType } from '../../types'
import DataTable from '../data-table'
import PageContainer from '../page-container'

import './styles.scss'

export default class Manufacturers extends React.Component {
  componentDidMount() {
    this.props.getManufacturers()
  }

  render() {
    const {
      loading,
      manufacturers,
      openManufacturer,
    } = this.props
    return (
      <PageContainer>
        <DataTable
          columns={['name', 'notes', 'createdAt']}
          data={manufacturers}
          loading={loading}
          onItemView={item => openManufacturer(item)}
          type="manufacturers"
        />
      </PageContainer>
    )
  }
}

Manufacturers.propTypes = {
  getManufacturers: PropTypes.func,
  loading: PropTypes.bool,
  manufacturers: PropTypes.arrayOf(ManufacturerType),
  openManufacturer: PropTypes.func,
}

Manufacturers.defaultProps = {
  getManufacturers: () => null,
  loading: true,
  manufacturers: [],
  openManufacturer: () => null,
}
