import {
  SETTINGS_UPDATE_FIELD,
} from '../constants/actions'

import { getTvaSettings as apiGetTvaSettings } from '../utils/api-helper'

export const updateSettingsField = (field, value) => ({
  field,
  type: SETTINGS_UPDATE_FIELD,
  value,
})

export const getTvaSettings = (countryCode) =>
  dispatch => {
    dispatch(updateSettingsField('loading', true))
    apiGetTvaSettings(countryCode)
      .then((data) => {
        console.log(data)
        // dispatch(updateSettingsField('tva', vat))
        dispatch(updateSettingsField('loading', false))
      })
  }
