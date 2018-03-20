import React from 'react'
import PropTypes from 'prop-types'
import { InventoryType, inventoryFormat } from '../../types'
import DataDetails from '../data-details'
import PageContainer from '../../containers/page-container'

import './styles.scss'

export default class Inventory extends React.Component {
  componentWillMount() {
    this.props.setPageName('Inventory')
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  render() {
    const {
      editing,
      toggleManufacturer,
      selectedInventory,
    } = this.props
    return (
      <PageContainer>
        <h1>Inventory Title</h1>
        <DataDetails
          currentEntity={selectedInventory}
          editing={editing}
          formattedData={inventoryFormat}
          toggleEdit={toggleManufacturer}
          type="manufacturers"
        />
      </PageContainer>
    )
  }
}

Inventory.propTypes = {
  editing: PropTypes.bool,
  selectedInventory: InventoryType,
  setPageName: PropTypes.func,
  toggleManufacturer: PropTypes.func,
}

Inventory.defaultProps = {
  editing: false,
  selectedInventory: {},
  setPageName: () => null,
  toggleManufacturer: () => null,
}
