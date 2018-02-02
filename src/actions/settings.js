import {
  SETTINGS_UPDATE_FIELD,
} from '../constants/actions'

import { getCategories as apiGetCategories } from '../utils/api-helper'
import { orderCategories } from '../utils/category-helper'

export const updateSettingsField = (field, value) => ({
  field,
  type: SETTINGS_UPDATE_FIELD,
  value,
})

export const getCategories = () =>
  dispatch => {
    dispatch(updateSettingsField('loading', true))
    apiGetCategories()
      .then(({ data }) => {
        const categories = orderCategories(data)
        dispatch(updateSettingsField('categories', categories))
        dispatch(updateSettingsField('loading', false))
      })
  }
