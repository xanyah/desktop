import {
  USER_UPDATE_FIELD,
  USER_UPDATE_USER,
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
  case USER_UPDATE_USER:
    return (state.email === action.user.email)
      ? action.user
      : state
  default:
    return state
  }
}
