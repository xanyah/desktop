import {
  PRODUCTS_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  loading: false,
  products: [],
  selectedProduct: {},
  variants: [],
}

export default (state = initialState, action) => {
  console.log(action)
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
