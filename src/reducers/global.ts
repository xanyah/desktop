import {
  GLOBAL_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  currentNavigationStep: '',
}

export default (state = initialState, action) => {
  switch(action.type) {
  case GLOBAL_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
