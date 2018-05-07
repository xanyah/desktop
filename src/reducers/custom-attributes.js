import {
  CUSTOM_ATTRIBUTES_CREATE_CUSTOM_ATTRIBUTE,
  CUSTOM_ATTRIBUTES_UPDATE_CUSTOM_ATTRIBUTE,
  CUSTOM_ATTRIBUTES_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  customAttributes: [],
  loading: false,
  selectedCustomAttribute: {},
}

export default (state = initialState, action) => {
  switch(action.type) {
  case CUSTOM_ATTRIBUTES_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  case CUSTOM_ATTRIBUTES_UPDATE_CUSTOM_ATTRIBUTE:
    return {
      ...state,
      customAttributes: state.customAttributes.map(customAttribute =>
        customAttribute.id === action.customAttribute.id
          ? action.customAttribute
          : customAttribute),
      selectedCustomAttribute: state.selectedCustomAttribute.id === action.customAttribute.id
        ? action.customAttribute
        : state.selectedCustomAttribute,
    }
  case CUSTOM_ATTRIBUTES_CREATE_CUSTOM_ATTRIBUTE:
    return {
      ...state,
      customAttributes: [...state.customAttributes, action.customAttribute],
    }
  default:
    return state
  }
}
