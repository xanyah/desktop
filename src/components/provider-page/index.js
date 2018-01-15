import React from 'react'
import { ProviderType } from '../../types'
import DataDetails from '../data-details'
import PageContainer from '../page-container'

import './styles.scss'

export default class Provider extends React.Component {
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
        />
      </PageContainer>
    )
  }
}

Provider.propTypes = {
  selectedProvider: ProviderType,
}

Provider.defaultProps = {
  selectedProvider: {},
}
