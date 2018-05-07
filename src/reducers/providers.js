import {
  PROVIDERS_CREATE_PROVIDER,
  PROVIDERS_UPDATE_FIELD,
  PROVIDERS_UPDATE_PROVIDER,
} from '../constants/actions'

const initialState = {
  loading: false,
  providers: [],
  selectedProvider: {},
}

export default (state = initialState, action) => {
  switch(action.type) {
  case PROVIDERS_CREATE_PROVIDER:
    return {
      ...state,
      providers: [...state.providers, action.provider],
    }
  case PROVIDERS_UPDATE_PROVIDER:
    return {
      ...state,
      providers: state.providers.map(provider => provider.id === action.provider.id
        ? action.provider
        : provider),
      selectedProvider: action.provider.id === state.selectedProvider.id
        ? action.provider
        : state.selectedProvider,
    }
  case PROVIDERS_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
