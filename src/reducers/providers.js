import {
  PROVIDERS_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  loading: false,
  providers: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
  case PROVIDERS_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
