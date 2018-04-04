import {
  PRODUCTS_UPDATE_PRODUCT,
  PRODUCTS_UPDATE_FIELD,
  PRODUCTS_UPDATE_VARIANT,
} from '../constants/actions'

const initialState = {
  editing: false,
  loading: false,
  productEditing: false,
  products: [],
  selectedProduct: {},
  selectedVariant: {},
  variantEditing: false,
  variants: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
  case PRODUCTS_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  case PRODUCTS_UPDATE_PRODUCT:
    return {
      ...state,
      products: state.products.map(product =>
        product.id === action.product.id
          ? action.product
          : product),
      selectedProduct: state.selectedProduct.id === action.product.id
        ? action.product
        : state.selectedProduct,
    }
  case PRODUCTS_UPDATE_VARIANT:
    return {
      ...state,
      selectedVariant: state.selectedVariant.id === action.variant.id
        ? action.variant
        : state.selectedVariant,
      variants: state.variants.map(variant =>
        variant.id === action.variant.id
          ? action.variant
          : variant),
    }
  default:
    return state
  }
}
