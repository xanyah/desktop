import {
  MANUFACTURERS_UPDATE_FIELD,
} from '../constants/actions'

import { getManufacturers as apiGetManufacturers } from '../utils/api-helper'

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
