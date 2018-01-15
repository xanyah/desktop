import {
  USER_UPDATE_FIELD,
} from '../constants/actions'

export const updateUserField = (field, value) => ({
  field,
  type: USER_UPDATE_FIELD,
  value,
})
