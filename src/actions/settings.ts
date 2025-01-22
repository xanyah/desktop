import {
  SETTINGS_UPDATE_FIELD,
} from '../constants/actions'

export const updateSettingsField = (field, value) => ({
  field,
  type: SETTINGS_UPDATE_FIELD,
  value,
})
