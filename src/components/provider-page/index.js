import React from 'react'
import PropTypes from 'prop-types'
import { ProviderType, providerFormat } from '../../types'
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
    const {
      createApiProvider,
      editing,
      toggleProvider,
      selectedProvider,
      updateApiProvider,
    } = this.props
    return (
      <PageContainer>
        <h1>{selectedProvider.name}</h1>
        <DataDetails
          createEntity={createApiProvider}
          currentEntity={selectedProvider}
          editing={editing}
          formattedData={providerFormat}
          toggleEdit={toggleProvider}
          type="providers"
          updateEntity={updateApiProvider}
        />
      </PageContainer>
    )
  }
}

Provider.propTypes = {
  createApiProvider: PropTypes.func,
  editing: PropTypes.bool,
  selectedProvider: ProviderType,
  setPageName: PropTypes.func,
  toggleProvider: PropTypes.func,
  updateApiProvider: PropTypes.func,
}

Provider.defaultProps = {
  createApiProvider: () => null,
  editing: false,
  selectedProvider: {},
  setPageName: () => null,
  toggleProvider: () => null,
  updateApiProvider: () => null,
}
