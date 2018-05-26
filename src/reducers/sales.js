import {
  SALES_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  loading: false,
  sales: [],
  selectedSale: {},
}

export default (state = initialState, action) => {
  switch(action.type) {
  case SALES_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
