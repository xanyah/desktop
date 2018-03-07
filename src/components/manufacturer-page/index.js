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
    const { selectedManufacturer } = this.props
    return (
      <PageContainer>
        <h1>{selectedManufacturer.name}</h1>
        <DataDetails
          formattedData={[
            [
              {
                attribute: 'notes',
                value: selectedManufacturer.notes,
              },
              {
                attribute: 'createdAt',
                value: selectedManufacturer.createdAt,
              },
            ],
          ]}
          type="manufacturers"
        />
      </PageContainer>
    )
  }
}

Manufacturer.propTypes = {
  selectedManufacturer: ManufacturerType,
  setPageName: PropTypes.func,
}

Manufacturer.defaultProps = {
  selectedManufacturer: {},
  setPageName: () => null,
}
