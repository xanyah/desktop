import { Button, CheckoutProductCard, Dialog } from '@/components'
import { useCurrentStore } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { map } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type PrintBarcodesDialogProps = {
  shippingProducts: ShippingProduct[]
  open: boolean
  onClose: () => void
}

const PrintBarcodesDialog = ({ shippingProducts, open, onClose }: PrintBarcodesDialogProps) => {
  const { t } = useTranslation()
  const store = useCurrentStore()
  const [reactiveShippingProducts, setReactiveShippingProducts] = useState(shippingProducts)

  const updateProductQuantity = useCallback((productId: Product['id'], quantity: number) => {
    setReactiveShippingProducts(currentProducts => map(currentProducts, (shippingProduct) => {
      if (shippingProduct.id === productId) {
        return {
          ...shippingProduct,
          quantity: quantity,
        }
      }
      return shippingProduct
    }))
  }, [setReactiveShippingProducts])

  const { mutate: onPrint, isPending } = useMutation({
    mutationFn: async () => {
      if (!store) {
        return
      }

      for (const shippingProduct of reactiveShippingProducts) {
        await window.electronAPI.printBarcode({ product: shippingProduct.product, store, count: shippingProduct.quantity })
      }
    },
    onSuccess: () => onClose(),
  })

  useEffect(() => {
    setReactiveShippingProducts(shippingProducts)
  }, [setReactiveShippingProducts, shippingProducts])

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col items-stretch gap-8">
        <h2>{t('shipping.printBarcodes.title')}</h2>

        <div className="flex flex-col items-stretch gap-4">
          {map(reactiveShippingProducts, shippingProduct => (
            <CheckoutProductCard
              withoutPrice
              productId={shippingProduct.product.id}
              quantity={shippingProduct.quantity}
              key={shippingProduct.id}
              onQuantityUpdate={newQuantity =>
                updateProductQuantity(shippingProduct.product.id, newQuantity)}
            />
          ))}
        </div>

        <div className="flex flex-row items-center justify-end gap-4">
          <Button variant="ghost" onClick={onClose}>{t('global.cancel')}</Button>
          <Button onClick={() => onPrint()} disabled={isPending}>{t('global.print')}</Button>
        </div>
      </div>
    </Dialog>
  )
}

export default PrintBarcodesDialog
