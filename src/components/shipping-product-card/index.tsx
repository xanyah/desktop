import { formatPrice, formatPriceCentsInput, formatPriceCentsInputValue } from '@/helpers/price'
import { useProduct } from '@/hooks'
import { RotateCcw, X } from 'lucide-react'
import { toNumber } from 'lodash'
import { useTranslation } from 'react-i18next'
import { InputText } from '../input'
import Button from '../button'
import { Control, Controller } from 'react-hook-form'

interface ShippingProductCardProps {
  onRemove?: () => void
  onRemoveCancel?: () => void
  productId: string
  quantityInputName: string
  newAmountInputName: string
  control: Control<any, any, any>
  willBeRemoved?: boolean
}

const ShippingProductCard = ({
  productId,
  control,
  onRemove,
  quantityInputName,
  newAmountInputName,
  willBeRemoved,
  onRemoveCancel,
}: ShippingProductCardProps) => {
  const { t } = useTranslation()
  const { data, isLoading } = useProduct(productId)

  if (isLoading || !data?.data) {
    return <p>{t('global.loading')}</p>
  }

  const product = data.data

  return (
    <div className={`${willBeRemoved && `opacity-30`} flex flex-row items-center justify-between gap-4`}>
      <div className="flex flex-col flex-1">
        <h4>{product.name}</h4>
        <p className="text-sm text-gray-500">
          {t('shipping.currentPrice')}
          :
          {formatPrice(product.amountCents, product.amountCurrency)}
        </p>
      </div>
      <div className="w-24">
        <Controller
          control={control}
          name={quantityInputName}
          render={({ field: { onChange, value } }) => (
            <InputText
              label={t('shipping.quantity')}
              value={value}
              onChange={e => onChange(toNumber(e.target.value))}
            />
          )}
        />
      </div>
      <div className="w-32">
        <Controller
          control={control}
          name={newAmountInputName}
          render={({ field: { onChange, value } }) => (
            <InputText
              label={t('shipping.newPrice')}
              value={formatPriceCentsInputValue(value)}
              onChange={e => onChange(formatPriceCentsInput(e))}
              placeholder={formatPrice(product.amountCents, product.amountCurrency)}
            />
          )}
        />
      </div>
      {onRemove && (
        willBeRemoved
          ? (
              <Button type="button" variant="ghost" onClick={onRemoveCancel}>
                <RotateCcw />
              </Button>
            )
          : (
              <Button type="button" variant="ghost" onClick={onRemove}>
                <X />
              </Button>
            ))}

    </div>
  )
}

export default ShippingProductCard
