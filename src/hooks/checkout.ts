import { CheckoutSchemaType } from '@/routes/checkout/schema'
import { map, sum, sumBy } from 'lodash'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

export const useCheckoutAmounts = () => {
  const { watch } = useFormContext<CheckoutSchemaType>()
  const totalProducts = watch('saleProductsAttributes')
  const promotion = watch('salePromotionAttributes')

  const totalProductsAmountCents = sum(map(totalProducts, product => product.quantity * product.amountCents))
  const itemsCount = sumBy(totalProducts, 'quantity')
  const totalAmountCents = useMemo(() => {
    switch (promotion?.type) {
      case 'flat_discount':
        return totalProductsAmountCents - promotion.amountCents
      case 'percent_discount':
        return totalProductsAmountCents * (1 - (promotion.amountCents / 100))
      default:
        return totalProductsAmountCents
    }
  }, [totalProductsAmountCents, promotion?.amountCents, promotion?.type])

  return {
    itemsCount,
    totalAmountCents,
    totalProductsAmountCents,
  }
}
