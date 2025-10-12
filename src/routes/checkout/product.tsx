import { formatNumberInput, formatPrice, formatPriceCentsInput, formatPriceCentsInputValue } from '@/helpers/price'
import { useProduct } from '@/hooks'
import { X } from 'lucide-react'
import { CheckoutSchemaType } from './schema'
import { Button, InputText } from '@/components'
import { useTranslation } from 'react-i18next'

interface ProductProps {
  saleProduct: CheckoutSchemaType['saleProductsAttributes'][0]
  onQuantityUpdate: (newQuantity?: number | null) => void
  onPriceUpdate: (newPrice?: number | null) => void
  onCustomLabelUpdate: (newCustomLabel?: string) => void
  onRemove: () => void
  quantity: number
}

const Product = ({
  onRemove,
  quantity,
  onQuantityUpdate,
  onCustomLabelUpdate,
  onPriceUpdate,
  saleProduct,
}: ProductProps) => {
  const { t } = useTranslation()
  const { data, isLoading } = useProduct(saleProduct.productId)

  if (!saleProduct.productId) {
    return (
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col flex-1">
          <InputText
            value={saleProduct.customLabel}
            onChange={e => onCustomLabelUpdate(e.target.value)}
          />
        </div>
        <p className="w-24 text-right">
          <InputText
            type="number"
            min="0"
            value={formatPriceCentsInputValue(saleProduct.amountCents)}
            onChange={e => onPriceUpdate(formatPriceCentsInput(e))}
          />
        </p>
        <div className="w-24">
          <InputText
            type="number"
            min="0"
            value={quantity}
            onChange={e => onQuantityUpdate(formatNumberInput(e))}
          />
        </div>
        <p className="w-32 text-right">
          {formatPrice(saleProduct.amountCents * quantity, 'EUR')}
        </p>
        <div className="w-10">
          <Button variant="ghost" onClick={onRemove} size="sm">
            <X />
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading || !data?.data) {
    return <p>{t('global.loading')}</p>
  }

  const product = data.data

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <div className="flex flex-col flex-1">
        <h4>{product.name}</h4>
        <p className="text-xs">{product.manufacturerSku}</p>
      </div>
      <div className="w-24">
        <InputText
          value={formatPriceCentsInputValue(saleProduct.amountCents)}
          type="number"
          onChange={e => onPriceUpdate(formatPriceCentsInput(e))}
        />
      </div>
      <div className="w-24">
        <InputText
          type="number"
          value={quantity}
          min="0"
          onChange={e => onQuantityUpdate(formatNumberInput(e))}
        />
      </div>
      <p className="w-32 text-right">
        {formatPrice(saleProduct.amountCents * quantity, product.amountCurrency)}
      </p>
      <div className="w-10">
        <Button variant="ghost" onClick={onRemove} size="sm">
          <X />
        </Button>
      </div>
    </div>
  )
}

export default Product
