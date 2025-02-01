import { formatPrice } from "@/helpers/price"
import { useCheckoutAmounts } from "@/hooks"
import Promotion from "./promotion"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { CheckoutSchemaType } from "./schema"
import { useTranslation } from "react-i18next"

const Price = () => {
  const {t} = useTranslation()
  const {setValue} = useFormContext<CheckoutSchemaType>()
  const {itemsCount, totalAmountCents, totalProductsAmountCents} = useCheckoutAmounts()

  useEffect(() => {
    setValue('totalAmountCents', totalAmountCents)
    setValue('totalAmountCurrency', 'EUR')
  }, [totalAmountCents, setValue])

  return <div className="grid grid-cols-4 gap-4">
    <p className="col-span-2">{t('checkout.subtotal')}</p>
    <p>{`${itemsCount} articles`}</p>
    <p className="text-right">{formatPrice(totalProductsAmountCents, 'EUR')}</p>
    <Promotion />
    <p className="col-span-2">{t('checkout.total')}</p>
    <p className="col-span-2 text-right">{formatPrice(totalAmountCents, 'EUR')}</p>
  </div>
}

export default Price
