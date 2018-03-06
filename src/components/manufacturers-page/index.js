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
      openManufacturer,
      manufacturers,
    } = this.props
    return (
      <PageContainer>
        <DataTable
          columns={['name', 'notes', 'createdAt']}
          data={manufacturers}
          onItemView={item => openManufacturer(item)}
          type="manufacturers"
        />
      </PageContainer>
    )
  }
}

Manufacturers.propTypes = {
  getManufacturers: PropTypes.func,
  manufacturers: PropTypes.arrayOf(ManufacturerType),
  openManufacturer: PropTypes.func,
}

Manufacturers.defaultProps = {
  getManufacturers: () => null,
  manufacturers: [],
  openManufacturer: () => null,
}
