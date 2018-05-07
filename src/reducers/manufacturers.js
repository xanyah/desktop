import {
  MANUFACTURERS_CREATE_MANUFACTURER,
  MANUFACTURERS_UPDATE_FIELD,
  MANUFACTURERS_UPDATE_MANUFACTURER,
} from '../constants/actions'

const initialState = {
  loading: false,
  manufacturers: [],
  selectedManufacturer: {},
}

export default (state = initialState, action) => {
  switch(action.type) {
  case MANUFACTURERS_CREATE_MANUFACTURER:
    return {
      ...state,
      manufacturers: [...state.manufacturers, action.manufacturer],
    }
  case MANUFACTURERS_UPDATE_MANUFACTURER:
    return {
      ...state,
      manufacturers: state.manufacturers.map(manufacturer =>
        manufacturer.id === action.manufacturer.id
          ? action.manufacturer
          : manufacturer),
      selectedManufacturer: state.selectedManufacturer.id === action.manufacturer.id
        ? action.manufacturer
        : state.selectedManufacturer,
    }
  case MANUFACTURERS_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
