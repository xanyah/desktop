import {
  ORDERS_UPDATE_FIELD,
  ORDERS_UPDATE_ORDER,
} from '../constants/actions'

const initialState = {
  loading: false,
  orders: [],
  selectedOrder: {},
}

export default (state = initialState, action) => {
  switch(action.type) {
  case ORDERS_UPDATE_ORDER:
    return {
      ...state,
      orders: state.orders.map(order => order.id === action.order.id
        ? action.order
        : order),
      selectedOrder: action.order.id === state.selectedOrder.id
        ? action.provider
        : state.selectedOrder,
    }
  case ORDERS_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
