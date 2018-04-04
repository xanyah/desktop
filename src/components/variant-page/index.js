import React from 'react'
import PropTypes from 'prop-types'

import { variantFormat, VariantType } from '../../types'
import PageContainer from '../../containers/page-container'
import DataDetails from '../data-details'

import './styles.scss'

export default class Variant extends React.Component {

  componentWillMount() {
    // console.log('BREADCRUMB LIKE Products > ArticleName > VariantBarcode')
    this.props.setPageName(this.props.selectedVariant.barcode)
  }

  componentWillUnmount() {
    this.props.setPageName('')
  }

  render() {
    const {
      variantEditing,
      toggleVariant,
      selectedVariant,
      updateApiVariant,
    } = this.props
    return (
      <PageContainer>
        <h1>{selectedVariant.barcode}</h1>
        <DataDetails
          currentEntity={selectedVariant}
          editing={variantEditing}
          formattedData={variantFormat}
          toggleEdit={toggleVariant}
          type="variants"
          updateEntity={updateApiVariant}
        />
      </PageContainer>
    )
  }
}

Variant.propTypes = {
  selectedVariant: PropTypes.shape(VariantType),
  setPageName: PropTypes.func,
  toggleVariant: PropTypes.func,
  updateApiVariant: PropTypes.func,
  variantEditing: PropTypes.bool,
  variants: PropTypes.arrayOf(VariantType),
}

Variant.defaultProps = {
  selectedVariant: {},
  setPageName: () => null,
  toggleVariant: () => null,
  updateApiVariant: () => null,
  variantEditing: false,
  variants: [],
}
