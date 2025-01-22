import {
  INVENTORIES_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  inventories: [],
  loading: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
  case INVENTORIES_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
