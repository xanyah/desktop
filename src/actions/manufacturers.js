import {
  MANUFACTURERS_UPDATE_MANUFACTURER,
  MANUFACTURERS_UPDATE_FIELD,
} from '../constants/actions'

import {
  getManufacturers as apiGetManufacturers,
  updateManufacturer as apiPatchManufacturerParams,
} from '../utils/api-helper'

import { formatManufacturer } from '../types'

export const updateManufacturer = manufacturer => ({
  manufacturer,
  type: MANUFACTURERS_UPDATE_MANUFACTURER,
})

export const updateManufacturerField = (field, value) => ({
  field,
  type: MANUFACTURERS_UPDATE_FIELD,
  value,
})

export const getManufacturers = () =>
  dispatch => {
    dispatch(updateManufacturerField('loading', true))
    apiGetManufacturers()
      .then(({ data }) => {
        dispatch(updateManufacturerField('manufacturers', data))
        dispatch(updateManufacturerField('loading', false))
      })
  }

export const updateApiManufacturer = newManufacturer =>
  dispatch => {
    newManufacturer = formatManufacturer(newManufacturer)
    dispatch(updateManufacturerField('loading', true))
    apiPatchManufacturerParams(newManufacturer.id, newManufacturer)
      .then(({ data }) => {
        dispatch(updateManufacturerField('loading', false))
        dispatch(updateManufacturer(data))
      })
  }
