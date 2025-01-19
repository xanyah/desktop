import React from 'react'
import PropTypes from 'prop-types'
import { CustomAttributeType, customAttributeFormat } from '../../types'
import DataDetails from '../data-details'
import PageContainer from '../../containers/page-container'

import './styles.scss'

export default class CustomAttribute extends React.Component {
  componentWillMount() {
    this.props.setPageName('Custom Attributes')
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  render() {
    const {
      createApiCustomAttribute,
      editing,
      toggleCustomAttribute,
      selectedCustomAttribute,
      updateApiCustomAttribute,
    } = this.props
    return (
      <PageContainer>
        <DataDetails
          createEntity={createApiCustomAttribute}
          currentEntity={selectedCustomAttribute}
          editing={editing}
          formattedData={customAttributeFormat}
          toggleEdit={toggleCustomAttribute}
          type="custom-attributes"
          updateEntity={updateApiCustomAttribute}
        />
      </PageContainer>
    )
  }
}

CustomAttribute.propTypes = {
  createApiCustomAttribute: PropTypes.func,
  editing: PropTypes.bool,
  selectedCustomAttribute: CustomAttributeType,
  setPageName: PropTypes.func,
  toggleCustomAttribute: PropTypes.func,
  updateApiCustomAttribute: PropTypes.func,
}

CustomAttribute.defaultProps = {
  createApiCustomAttribute: () => null,
  editing: false,
  selectedCustomAttribute: {},
  setPageName: () => null,
  toggleCustomAttribute: () => null,
  updateApiCustomAttribute: () => null,
}
