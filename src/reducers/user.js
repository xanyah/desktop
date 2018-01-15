import {
  USER_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  email: '',
  errors: [],
  firstname: '',
  lastname: '',
  loading: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
  case USER_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
