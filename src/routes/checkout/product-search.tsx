import { useFormContext } from 'react-hook-form'
import { CheckoutSchemaType } from './schema'
import { findIndex, size } from 'lodash'
import { Button, ProductSearchForm } from '@/components'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

const ProductSearch = () => {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<CheckoutSchemaType>()

  const addProduct = useCallback((product: Product) => {
    const saleProductsAttributes = watch('saleProductsAttributes')
    const existingProductIndex = findIndex(saleProductsAttributes, { productId: product.id })

    if (existingProductIndex !== -1) {
      setValue(
        `saleProductsAttributes.${existingProductIndex}.quantity`,
        saleProductsAttributes[existingProductIndex].quantity + 1)
    }
    else {
      setValue(
        `saleProductsAttributes.${size(saleProductsAttributes)}`,
        {
          originalAmountCents: product.amountCents,
          originalAmountCurrency: product.amountCurrency,
          amountCents: product.amountCents,
          amountCurrency: product.amountCurrency,
          productId: product.id,
          quantity: 1,
        })
    }
  }, [setValue, watch])

  const addCustomProduct = useCallback(() => {
    const saleProductsAttributes = watch('saleProductsAttributes')
    setValue(
      `saleProductsAttributes.${size(saleProductsAttributes)}`,
      {
        amountCents: 0,
        amountCurrency: 'EUR',
        customLabel: '',
        quantity: 1,
      })
  }, [setValue, watch])

  return (
    <div className="flex items-center gap-4 self-stretch">
      <ProductSearchForm onProductSelect={addProduct} />
      <span className="text-sm text-slate-600">
        {t('global.or').toUpperCase()}
      </span>
      <Button variant="outline" onClick={addCustomProduct}>{t('checkout.customProduct')}</Button>
    </div>
  )
}

export default ProductSearch
