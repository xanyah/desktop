import {
  CATEGORIES_CREATE_CATEGORY,
  CATEGORIES_UPDATE_FIELD,
} from '../constants/actions'

import { orderCategories } from '../utils/category-helper'

const initialState = {
  categories: [],
  loading: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
  case CATEGORIES_CREATE_CATEGORY :
    return {
      ...state,
      categories: orderCategories([...state.categories, action.category]),
    }
  case CATEGORIES_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
