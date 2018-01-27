import {
  MANUFACTURERS_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  loading: false,
  manufacturers: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
  case MANUFACTURERS_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
