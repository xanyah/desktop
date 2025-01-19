const promotionTypes = require('./promotion-types')

test('flatPromotionType', () => {
  expect(promotionTypes.flatPromotionType.calculatePrice(20, 3)).toBe(17)
  expect(promotionTypes.flatPromotionType.calculatePrice(40, 5)).toBe(35)
})

test('percentPromotionType', () => {
  expect(promotionTypes.percentPromotionType.calculatePrice(20, 10)).toBe(18)
  expect(promotionTypes.flatPromotionType.calculatePrice(100, 5)).toBe(95)
})
