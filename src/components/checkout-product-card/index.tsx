import { formatPrice } from "@/helpers/price"
import { useProduct } from "@/hooks"
import { Button, InputText } from "../ui"
import { X } from "lucide-react"
import { toNumber } from "lodash"

type CheckoutProductCardProps = {
  productId: string
  quantity: number
  onRemove: () => void
  onQuantityUpdate: (newQuantity: number) => void
}

const CheckoutProductCard = ({ productId, onRemove, quantity, onQuantityUpdate }: CheckoutProductCardProps) => {
  const { data, isLoading } = useProduct(productId)

  if (isLoading || !data?.data) {
    return <p>Loading...</p>
  }

  const product = data.data

  return <div className="flex flex-row items-center justify-between gap-4">
    <div className="flex flex-col flex-1">
      <h4>{product.name}</h4>
      <p>{formatPrice(product.amountCents, product.amountCurrency)}</p>
    </div>
    <div className="w-24">
      <InputText
        value={quantity}
        onChange={(e) => onQuantityUpdate(toNumber(e.target.value))}
      />
    </div>
    <p>{formatPrice(product.amountCents * quantity, product.amountCurrency)}</p>
    <Button variant="ghost" onClick={onRemove}><X /></Button>
  </div>
}

export default CheckoutProductCard
