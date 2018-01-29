import {
  SETTINGS_UPDATE_FIELD,
} from '../constants/actions'

import { getTvaSettings as apiGetTvaSettings } from '../utils/api-helper'

export const updateSettingsField = (field, value) => ({
  field,
  type: SETTINGS_UPDATE_FIELD,
  value,
})

export const getTvaSettings = () =>
  dispatch => {
    dispatch(updateSettingsField('loading', true))
    apiGetTvaSettings()
      .then(({ data }) => {
        dispatch(updateSettingsField('tva', data))
        dispatch(updateSettingsField('loading', false))
      })
  }
