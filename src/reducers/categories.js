import {
  CATEGORIES_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  categories: [],
  loading: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
  case CATEGORIES_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
