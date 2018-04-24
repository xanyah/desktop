import React from 'react'
import PropTypes from 'prop-types'
import { ShippingType, shippingFormat } from '../../types'
import DataDetails from '../data-details'
import PageContainer from '../../containers/page-container'

import './styles.scss'

export default class Shipping extends React.Component {
  componentWillMount() {
    this.props.setPageName(this.props.selectedShipping.name)
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  render() {
    const {
      createApiShipping,
      editing,
      toggleShipping,
      selectedShipping,
      updateApiShipping,
    } = this.props
    return (
      <PageContainer>
        <h1>{selectedShipping.name}</h1>
        <DataDetails
          createEntity={createApiShipping}
          currentEntity={selectedShipping}
          editing={editing}
          formattedData={shippingFormat}
          toggleEdit={toggleShipping}
          type="shippings"
          updateEntity={updateApiShipping}
        >
        </DataDetails>
      </PageContainer>
    )
  }
}

Shipping.propTypes = {
  createApiShipping: PropTypes.func,
  editing: PropTypes.bool,
  selectedShipping: ShippingType,
  setPageName: PropTypes.func,
  toggleShipping: PropTypes.func,
  updateApiShipping: PropTypes.func,
}

Shipping.defaultProps = {
  createApiShipping: () => null,
  editing: false,
  selectedShipping: {},
  setPageName: () => null,
  toggleShipping: () => null,
  updateApiShipping: () => null,
}
