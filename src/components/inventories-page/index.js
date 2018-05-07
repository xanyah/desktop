import React from 'react'
import PropTypes from 'prop-types'
import { InventoryType } from '../../types'
import DataTable from '../data-table'
import PageContainer from '../page-container'

import './styles.scss'

export default class Inventories extends React.Component {
  componentDidMount() {
    this.props.getInventories()
  }

  render() {
    const {
      loading,
      openInventory,
      inventories,
    } = this.props
    return (
      <PageContainer>
        <DataTable
          columns={['status', 'createdAt']}
          data={inventories}
          loading={loading}
          onItemView={item => openInventory(item)}
          type="inventories"
        />
      </PageContainer>
    )
  }
}

Inventories.propTypes = {
  getInventories: PropTypes.func,
  inventories: PropTypes.arrayOf(InventoryType),
  loading: PropTypes.bool,
  openInventory: PropTypes.func,
}

Inventories.defaultProps = {
  getInventories: () => null,
  inventories: [],
  loading: true,
  openInventory: () => null,
}
