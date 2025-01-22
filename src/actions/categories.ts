import {
  CATEGORIES_CREATE_CATEGORY,
  CATEGORIES_UPDATE_FIELD,
} from '../constants/actions'

import {
  createCategory as apiPostCategory,
  getCategories as apiGetCategories,
} from '../utils/api-helper'
import { orderCategories } from '../utils/category-helper'

import { I18n } from 'react-redux-i18n'

export const updateCategoriesField = (field, value) => ({
  field,
  type: CATEGORIES_UPDATE_FIELD,
  value,
})

export const createCategory = category => ({
  category,
  type: CATEGORIES_CREATE_CATEGORY,
})

import { formatCategory } from '../types'

export const getCategories = params =>
  dispatch => {
    dispatch(updateCategoriesField('loading', true))
    apiGetCategories(params)
      .then(({ data }) => {
        const categories = orderCategories(data)
        dispatch(updateCategoriesField('categories', categories))
        dispatch(updateCategoriesField('loading', false))
      })
  }

import {
  showSuccessToast,
  showErrorToast,
} from '../utils/notification-helper'

export const createApiCategory = newCategory =>
  (dispatch, currentState) => {
    const state = currentState()
    if(state && state.stores && state.stores.currentStore) {
      const storeId = state.stores.currentStore.id
      newCategory = formatCategory(newCategory)
      dispatch(updateCategoriesField('loading', true))
      apiPostCategory({...newCategory, storeId})
        .then(({ data }) => {
          dispatch(updateCategoriesField('loading', false))
          dispatch(createCategory(data))
          showSuccessToast(I18n.t('toast.created', {entity: I18n.t('models.categories.title')}))
        })
        .catch(() => {
          showErrorToast(I18n.t('toast.error'))
        })
    }
  }
