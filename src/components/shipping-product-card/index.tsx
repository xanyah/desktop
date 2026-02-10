import { formatPrice, formatPriceCentsInput, formatPriceCentsInputValue } from '@/helpers/price'
import { useProduct } from '@/hooks'
import { RotateCcw, X } from 'lucide-react'
import { toNumber } from 'lodash'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InputText } from '../input'
import Button from '../button'
import { Control, Controller } from 'react-hook-form'

interface ShippingProductCardProps {
  onRemove?: () => void
  onRemoveCancel?: () => void
  productId: string
  quantityInputName: string
  newBuyingAmountInputName: string
  newSellingAmountInputName: string
  control: Control<any, any, any>
  willBeRemoved?: boolean
}

const ShippingProductCard = ({
  productId,
  control,
  onRemove,
  quantityInputName,
  newBuyingAmountInputName,
  newSellingAmountInputName,
  willBeRemoved,
  onRemoveCancel,
}: ShippingProductCardProps) => {
  const { t } = useTranslation()
  const { data, isLoading } = useProduct(productId)
  const [showPriceFields, setShowPriceFields] = useState(false)

  if (isLoading || !data?.data) {
    return <p>{t('global.loading')}</p>
  }

  const product = data.data

  return (
    <div className={`${willBeRemoved && `opacity-30`} flex flex-col gap-2`}>
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col flex-1">
          <h4>{product.name}</h4>
          <p className="text-sm text-gray-500">
            {t('shipping.currentStock')}
            :
            {' '}
            {product.quantity}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowPriceFields(!showPriceFields)}
        >
          {t('shipping.updatePrice')}
        </Button>
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

      {showPriceFields && (
        <div className="flex flex-row gap-4 pl-4 border-l-2">
          <div className="flex-1">
            <Controller
              control={control}
              name={newBuyingAmountInputName}
              render={({ field: { onChange, value } }) => (
                <InputText
                  label={t('shipping.newBuyingPrice')}
                  value={formatPriceCentsInputValue(value)}
                  onChange={e => onChange(formatPriceCentsInput(e))}
                  placeholder={formatPrice(product.buyingAmountCents, product.buyingAmountCurrency)}
                  hint={`${t('shipping.currentBuyingPrice')}: ${formatPrice(product.buyingAmountCents, product.buyingAmountCurrency)}`}
                />
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              control={control}
              name={newSellingAmountInputName}
              render={({ field: { onChange, value } }) => (
                <InputText
                  label={t('shipping.newSellingPrice')}
                  value={formatPriceCentsInputValue(value)}
                  onChange={e => onChange(formatPriceCentsInput(e))}
                  placeholder={formatPrice(product.amountCents, product.amountCurrency)}
                  hint={`${t('shipping.currentSellingPrice')}: ${formatPrice(product.amountCents, product.amountCurrency)}`}
                />
              )}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ShippingProductCard
