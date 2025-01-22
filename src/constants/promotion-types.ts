export const flatPromotionType = {
  calculatePrice: (price = 0, rate = 0) => price - rate,
  key: 'flat_discount',
}
export const percentPromotionType = {
  calculatePrice: (price = 0, rate = 0) => price * (1 - (rate / 100)),
  key: 'percent_discount',
}

export default [
  flatPromotionType,
  percentPromotionType,
]
