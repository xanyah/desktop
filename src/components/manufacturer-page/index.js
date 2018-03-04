import React from 'react'
import PropTypes from 'prop-types'
import { ManufacturerType } from '../../types'
import DataDetails from '../data-details'
import PageContainer from '../../containers/page-container'

import './styles.scss'

export default class Manufacturer extends React.Component {
  componentWillMount() {
    this.props.setPageName(this.props.selectedManufacturer.name)
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  render() {
    const {
      editing,
      toggleManufacturer,
      selectedManufacturer,
      updateManufacturerParams,
    } = this.props
    return (
      <PageContainer>
        <h1>{selectedManufacturer.name}</h1>
        <DataDetails
          currentEntity={selectedManufacturer}
          editing={editing}
          formattedData={[
            [
              {
                attribute: 'notes',
                editable: true,
                type: 'textarea',
                value: selectedManufacturer.notes,
              },
              {
                attribute: 'createdAt',
                editable: false,
                value: selectedManufacturer.createdAt,
              },
            ],
          ]}
          toggleEdit={toggleManufacturer}
          type="manufacturers"
          updateEntity={updateManufacturerParams}
        />
      </PageContainer>
    )
  }
}

Manufacturer.propTypes = {
  editing: PropTypes.bool,
  selectedManufacturer: ManufacturerType,
  setPageName: PropTypes.func,
  toggleManufacturer: PropTypes.func,
  updateManufacturerParams: PropTypes.func,
}

Manufacturer.defaultProps = {
  editing: false,
  selectedManufacturer: {},
  setPageName: () => null,
  toggleManufacturer: () => null,
  updateManufacturerParams: () => null,
}
