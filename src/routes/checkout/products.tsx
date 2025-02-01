import {  useFormContext } from "react-hook-form"
import { CheckoutSchemaType } from "./schema"
import { filter, map } from "lodash"
import Product from "./product"
import { useCallback } from "react"

const Products = () => {
  const { watch, setValue } = useFormContext<CheckoutSchemaType>()
  const products = watch('saleProductsAttributes')

  const onQuantityUpdate = useCallback((index: number, value: number) => {
    setValue(`saleProductsAttributes.${index}.quantity`, value)
  }, [setValue])

  const onRemove = useCallback((productId: string) => {
    const actualSaleProducts = watch('saleProductsAttributes')
    setValue(`saleProductsAttributes`, filter(actualSaleProducts, product => product.productId !== productId ))
  }, [setValue, watch])

  return <div className="flex flex-col gap-4">
    {map(products, (productAttribute, index) =>
      <Product
        key={productAttribute.productId}
        saleProduct={productAttribute}
        onQuantityUpdate={(newQuantity) => onQuantityUpdate(index, newQuantity)}
        quantity={productAttribute.quantity}
        onRemove={() => onRemove(productAttribute.productId)}
      />
    )}
  </div>
}

export default Products
