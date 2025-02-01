import { formatPrice } from "@/helpers/price"
import { useProduct } from "@/hooks"
import { Button, InputText } from "../ui"
import { X } from "lucide-react"
import { toNumber } from "lodash"
import { useTranslation } from "react-i18next"

type CheckoutProductCardProps = {
  onQuantityUpdate: (newQuantity: number) => void
  onRemove: () => void
  productId: string
  quantity: number
  withoutPrice?: boolean
}

const CheckoutProductCard = ({ productId, onRemove, quantity, onQuantityUpdate, withoutPrice }: CheckoutProductCardProps) => {
  const {t} = useTranslation()
  const { data, isLoading } = useProduct(productId)

  if (isLoading || !data?.data) {
    return <p>{t('global.loading')}</p>
  }

  const product = data.data

  return <div className="flex flex-row items-center justify-between gap-4">
    <div className="flex flex-col flex-1">
      <h4>{product.name}</h4>
      <p>{withoutPrice ? product.manufacturerSku : formatPrice(product.amountCents, product.amountCurrency)}</p>
    </div>
    <div className="w-24">
      <InputText
        value={quantity}
        onChange={(e) => onQuantityUpdate(toNumber(e.target.value))}
      />
    </div>
    {!withoutPrice && <p>{formatPrice(product.amountCents * quantity, product.amountCurrency)}</p>}
    <Button variant="ghost" onClick={onRemove}><X /></Button>
  </div>
}

export default CheckoutProductCard
