import {
  PRODUCTS_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  loading: false,
  products: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
  case PRODUCTS_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
