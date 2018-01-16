import React from 'react'
import PropTypes from 'prop-types'
import { ProviderType } from '../../types'
import DataDetails from '../data-details'
import PageContainer from '../../containers/page-container'

import './styles.scss'

export default class Provider extends React.Component {
  componentWillMount() {
    this.props.setPageName(this.props.selectedProvider.name)
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  render() {
    const { selectedProvider } = this.props
    return (
      <PageContainer>
        <h1>{selectedProvider.name}</h1>
        <DataDetails
          formattedData={[
            [
              {
                attribute: 'notes',
                value: selectedProvider.notes,
              },
              {
                attribute: 'createdAt',
                value: selectedProvider.createdAt,
              },
            ],
          ]}
          type="providers"
        />
      </PageContainer>
    )
  }
}

Provider.propTypes = {
  selectedProvider: ProviderType,
  setPageName: PropTypes.func,
}

Provider.defaultProps = {
  selectedProvider: {},
  setPageName: () => null,
}
