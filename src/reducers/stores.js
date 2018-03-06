import {
  STORES_UPDATE_FIELD,
  STORES_UPDATE_STORE,
} from '../constants/actions'

const initialState = {
  currentStore: {},
  loading: false,
  stores: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
  case STORES_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  case STORES_UPDATE_STORE:
    return {
      ...state,
      currentStore: action.store.id === state.currentStore.id ? action.store : state.currentStore,
      stores: state.stores.map(store => store.id === action.store.id
        ? action.store
        : store
      ),
    }
  default:
    return state
  }
}
