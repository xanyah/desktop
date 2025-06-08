import { formatPrice } from '@/helpers/price'
import { useProduct } from '@/hooks'
import { X } from 'lucide-react'
import { toNumber } from 'lodash'
import { CheckoutSchemaType } from './schema'
import { Button, InputText } from '@/components'
import { useTranslation } from 'react-i18next'

interface ProductProps {
  saleProduct: CheckoutSchemaType['saleProductsAttributes'][0]
  onQuantityUpdate: (newQuantity?: number) => void
  onRemove: () => void
  quantity: number
}

const Product = ({
  onRemove,
  quantity,
  onQuantityUpdate,
  saleProduct,
}: ProductProps) => {
  const { t } = useTranslation()
  const { data, isLoading } = useProduct(saleProduct.productId)

  if (isLoading || !data?.data) {
    return <p>{t('global.loading')}</p>
  }

  const product = data.data

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <div className="flex flex-col flex-1">
        <h4>{product.name}</h4>
        <p className="text-xs">{product.manufacturerSku}</p>
        <p className="text-xs text-indigo-500">
          {formatPrice(product.amountCents, product.amountCurrency)}
        </p>
      </div>
      <div className="w-24">
        <InputText
          type="number"
          value={quantity}
          onChange={(e) => {
            const v = e.target.value
            onQuantityUpdate(v ? toNumber(e.target.value) : undefined)
          }}
        />
      </div>
      <p className="w-32 text-right">
        {formatPrice(product.amountCents * quantity, product.amountCurrency)}
      </p>
      <Button variant="ghost" onClick={onRemove}>
        <X />
      </Button>
    </div>
  )
}

export default Product
