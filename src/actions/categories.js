import {
  CATEGORIES_UPDATE_FIELD,
} from '../constants/actions'

import { getCategories as apiGetCategories } from '../utils/api-helper'
import { orderCategories } from '../utils/category-helper'

export const updateCategoriesField = (field, value) => ({
  field,
  type: CATEGORIES_UPDATE_FIELD,
  value,
})

export const getCategories = params =>
  dispatch => {
    dispatch(updateCategoriesField('loading', true))
    apiGetCategories()
      .then(({ data }) => {
        const categories = orderCategories(data)
        dispatch(updateCategoriesField('categories', categories))
        dispatch(updateCategoriesField('loading', false))
      })
  }
