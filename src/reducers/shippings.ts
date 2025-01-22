import {
  SHIPPINGS_UPDATE_FIELD,
  SHIPPINGS_UPDATE_SHIPPING,
} from '../constants/actions'

const initialState = {
  loading: false,
  selectedShipping: {},
  shippings: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
  case SHIPPINGS_UPDATE_SHIPPING:
    return {
      ...state,
      selectedShipping: action.shipping.id === state.selectedShipping.id
        ? action.provider
        : state.selectedShipping,
      shippings: state.shippings.map(shipping => shipping.id === action.shipping.id
        ? action.shipping
        : shipping),
    }
  case SHIPPINGS_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
