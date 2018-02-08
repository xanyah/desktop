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
    const { editing, toggleProvider, selectedProvider } = this.props
    return (
      <PageContainer>
        <h1>{selectedProvider.name}</h1>
        <DataDetails
          formattedData={[
            [
              {
                attribute: 'notes',
                editable: true,
                type: 'textarea',
                value: selectedProvider.notes,
              },
              {
                attribute: 'createdAt',
                editable: false,
                value: selectedProvider.createdAt,
              },
            ],
          ]}
          type="providers"
          editing={editing}
          toggleEdit={toggleProvider}
        />
      </PageContainer>
    )
  }
}

Provider.propTypes = {
  editing: PropTypes.bool,
  selectedProvider: ProviderType,
  setPageName: PropTypes.func,
  toggleProvider: PropTypes.func,
}

Provider.defaultProps = {
  editing: false,
  selectedProvider: {},
  setPageName: () => null,
  toggleProvider: () => null,
}
