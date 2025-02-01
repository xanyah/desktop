import { useFormContext } from "react-hook-form"
import { CheckoutSchemaType } from "./schema"
import { findIndex, head, size } from "lodash"
import { Button, InputText } from "@/components"
import { FormEventHandler, useCallback } from "react"
import { useCurrentStore } from "@/hooks"
import { getProducts } from "@/api"
import { useTranslation } from "react-i18next"

const ProductSearch = () => {
  const {t} = useTranslation()
  const store = useCurrentStore()
  const { watch, setValue } = useFormContext<CheckoutSchemaType>()

  const addProduct = useCallback((product: Product) => {
    const saleProductsAttributes = watch('saleProductsAttributes')
    const existingProductIndex = findIndex(saleProductsAttributes, { productId: product.id })

    if (existingProductIndex !== -1) {
      setValue(
        `saleProductsAttributes.${existingProductIndex}.quantity`,
        saleProductsAttributes[existingProductIndex].quantity + 1)
    } else {
      setValue(
        `saleProductsAttributes.${size(saleProductsAttributes)}`,
        {
          originalAmountCents: product.amountCents,
          originalAmountCurrency: product.amountCurrency,
          amountCents: product.amountCents,
          amountCurrency: product.amountCurrency,
          productId: product.id,
          quantity: 1
        })
    }
  }, [setValue, watch])

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const query = formData.get('query')
      const { data } = await getProducts({ 'q[storeIdEq]': store?.id, 'q[skuOrUpcOrManufacturerSkuEq]': query })

      if (size(data) === 1) {
        addProduct(head(data) as Product);
        (e.target as HTMLFormElement).reset()
      }
    } catch (err) {
      console.error(err)
    }
  }, [addProduct, store])

  return <form className="flex flex-row gap-4" onSubmit={onSubmit}>
    <InputText name="query" placeholder={t('checkout.searchPlaceholder')} />
    <Button variant="outline" type="submit">{t('checkout.searchButton')}</Button>
  </form>
}

export default ProductSearch
