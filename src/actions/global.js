import {
  GLOBAL_UPDATE_FIELD,
} from '../constants/actions'

export const updateGlobalField = (field, value) => ({
  field,
  type: GLOBAL_UPDATE_FIELD,
  value,
})

