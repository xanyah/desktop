import {
  CLIENTS_UPDATE_FIELD,
  CLIENTS_UPDATE_CLIENT,
} from '../constants/actions'

const initialState = {
  clients: [],
  editing: false,
  loading: false,
  selectedClient: {},
}

export default (state = initialState, action) => {
  switch(action.type) {
  case CLIENTS_UPDATE_CLIENT:
    return {
      ...state,
      clients: state.clients.map(client =>
        client.id === action.client.id
          ? action.client
          : client),
      selectedClient: state.selectedClient.id === action.client.id
        ? action.client
        : state.selectedClient,
    }
  case CLIENTS_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
