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
    const {
      editing,
      toggleProvider,
      selectedProvider,
      updateProviderParams,
    } = this.props
    return (
      <PageContainer
        // footerElements={(
      //   <div className="footer">
      //     {(editing)
      //       ? <button className="btn-link" onClick={() => toggleProvider()}>Validate</button>
      //       : <button className="btn-link" onClick={() => toggleProvider()}>Edit</button>
      //     }
      //   </div>
      // )}
      >
        <h1>{selectedProvider.name}</h1>
        <DataDetails
          currentEntity={selectedProvider}
          editing={editing}
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
          toggleEdit={toggleProvider}
          type="providers"
          updateEntity={updateProviderParams}
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
  updateProviderParams: PropTypes.func,
}

Provider.defaultProps = {
  editing: false,
  selectedProvider: {},
  setPageName: () => null,
  toggleProvider: () => null,
  updateProviderParams: () => null,
}
