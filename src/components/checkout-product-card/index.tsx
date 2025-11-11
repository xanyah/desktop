import { formatPrice } from '@/helpers/price'
import { useProduct } from '@/hooks'
import { RotateCcw, X } from 'lucide-react'
import { toNumber } from 'lodash'
import { useTranslation } from 'react-i18next'
import { InputText } from '../input'
import Button from '../button'
import { Control, Controller } from 'react-hook-form'

interface CheckoutProductCardProps {
  onRemove?: () => void
  onRemoveCancel?: () => void
  productId: string
  quantity: number
  quantityInputName: string
  control: Control<any, any, any>
  withoutPrice?: boolean
  willBeRemoved?: boolean
}

const CheckoutProductCard = ({
  productId,
  control,
  onRemove,
  quantity,
  withoutPrice,
  quantityInputName,
  willBeRemoved,
  onRemoveCancel,
}: CheckoutProductCardProps) => {
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
        <p>
          {withoutPrice
            ? product.manufacturerSku
            : formatPrice(product.amountCents, product.amountCurrency)}
        </p>
      </div>
      <div className="w-24">
        <Controller
          control={control}
          name={quantityInputName}
          render={({ field: { onChange, value } }) => (
            <InputText
              value={value}
              onChange={e => onChange(toNumber(e.target.value))}
            />
          )}
        />
      </div>
      {!withoutPrice && (
        <p>
          {formatPrice(product.amountCents * quantity, product.amountCurrency)}
        </p>
      )}
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

export default CheckoutProductCard
