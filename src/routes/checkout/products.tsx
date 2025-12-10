import { useFieldArray, useFormContext } from 'react-hook-form'
import { CheckoutSchemaType } from './schema'
import { isEmpty, map } from 'lodash'
import Product from './product'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

const Products = () => {
  const { t } = useTranslation()
  const { control, watch, setValue } = useFormContext<CheckoutSchemaType>()
  const { remove } = useFieldArray({
    control,
    name: 'saleProductsAttributes',
  })
  const products = watch('saleProductsAttributes')

  const onQuantityUpdate = useCallback((index: number, value: number | undefined | null) => {
    setValue(`saleProductsAttributes.${index}.quantity`, value as any)
  }, [setValue])

  const onRemove = useCallback((index: number) => {
    remove(index)
  }, [remove])

  const onCustomLabelUpdate = useCallback((index: number, value: string | undefined | null) => {
    setValue(`saleProductsAttributes.${index}.customLabel`, value as any)
  }, [setValue])

  const onPriceUpdate = useCallback((index: number, value: number | undefined | null) => {
    setValue(`saleProductsAttributes.${index}.amountCents`, value as any)
  }, [setValue])

  return (
    <div className="flex flex-col gap-4">
      {!isEmpty(products) && (
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col flex-1">
            <h3>{t('checkout.product.name')}</h3>
          </div>
          <div className="w-24">
            <h3>{t('checkout.product.unitPrice')}</h3>
          </div>
          <div className="w-24">
            <h3>{t('checkout.product.quantity')}</h3>
          </div>
          <h3 className="w-32 text-right">{t('checkout.product.totalPrice')}</h3>
          <div className="w-10" />
        </div>
      )}
      {map(products, (productAttribute, index) => (
        <Product
          key={productAttribute.productId || Math.random()}
          saleProduct={productAttribute}
          onQuantityUpdate={newQuantity => onQuantityUpdate(index, newQuantity)}
          quantity={productAttribute.quantity}
          onRemove={() => onRemove(index)}
          onCustomLabelUpdate={newLabel => onCustomLabelUpdate(index, newLabel)}
          onPriceUpdate={newLabel => onPriceUpdate(index, newLabel)}
        />
      ),
      )}
    </div>
  )
}

export default Products
