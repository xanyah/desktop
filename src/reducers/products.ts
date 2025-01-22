import {
  PRODUCTS_CREATE_PRODUCT,
  PRODUCTS_UPDATE_FIELD,
  PRODUCTS_UPDATE_PRODUCT,
  PRODUCTS_CREATE_VARIANT,
  PRODUCTS_UPDATE_VARIANT,
  PRODUCTS_CREATE_VARIANT_ATTRIBUTE,
  PRODUCTS_UPDATE_VARIANT_ATTRIBUTE,
} from '../constants/actions'

const initialState = {
  editing: false,
  loading: false,
  productEditing: false,
  products: [],
  selectedProduct: {},
  selectedVariant: {},
  variantAttributeEditing: false,
  variantEditing: false,
  variants: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
  case PRODUCTS_CREATE_PRODUCT:
    return {
      ...state,
      products: [...state.products, action.product],
    }
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
  case PRODUCTS_CREATE_VARIANT:
    return {
      ...state,
      variants: [
        ...state.variants,
        action.variant,
      ],
    }
  case PRODUCTS_UPDATE_VARIANT_ATTRIBUTE:
    return {
      ...state,
      selectedVariant: state.selectedVariant.variantAttributes.map(variantAttribute => (
        variantAttribute.id === action.variantAttribute.id
          ? action.variantAttribute
          : variantAttribute
      )),
      variants: state.variants.map(variant =>
        variant.variantAttribute.map(variantAttribute =>
          variantAttribute.id === action.variantAttribute.id
            ? action.variantAttribute
            : variantAttribute
        )),
    }
  case PRODUCTS_CREATE_VARIANT_ATTRIBUTE:
    return {
      ...state,
      selectedVariant: {
        ...state.selectedVariant,
        variantAttributes: [
          ...state.selectedVariant.variantAttributes,
          action.variantAttribute,
        ],
      },
      variants: state.variants.map(variant =>
        variant.id === action.variantAttribute.id
          ? {
            ...variant,
            variantAttributes: [
              ...variant.variantAttributes,
              action.variantAttribute,
            ],
          }
          : variant
      ),
    }
  default:
    return state
  }
}
