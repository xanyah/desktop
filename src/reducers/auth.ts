import {
  AUTH_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  email: 'regular@xanyah.io',
  errors: [],
  loading: false,
  password: '12345678',
  passwordConfirmation: '',
  passwordInput: null,
  passwordToken: '',
  signedIn: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
  case AUTH_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
