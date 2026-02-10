import { Button, CheckoutProductCard, Dialog } from '@/components'
import { useCurrentStore } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { map, values } from 'lodash'
import { z } from '../../constants/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'

type PrintBarcodesDialogProps = {
  shippingProducts: ShippingProduct[]
  open: boolean
  onClose: () => void
}

const formSchema = z.array(
  z.object({
    id: z.string(),
    quantity: z.number(),
    product: z.any(),
  }),
).min(1)

type FormType = z.infer<typeof formSchema>

const PrintBarcodesDialog = ({ shippingProducts, open, onClose }: PrintBarcodesDialogProps) => {
  const { t } = useTranslation()
  const store = useCurrentStore()
  const { control, reset, getValues, watch } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  const { mutate: onPrintSingle, isPending: isPrintingSingle } = useMutation({
    mutationFn: async ({ product, quantity }: { product: any, quantity: number }) => {
      if (!store) {
        return
      }

      await window.electronAPI.printBarcode({ product, store, count: quantity })
    },
  })

  const { mutate: onPrint, isPending } = useMutation({
    mutationFn: async () => {
      if (!store) {
        return
      }

      for (const shippingProduct of values(getValues())) {
        await window.electronAPI.printBarcode({ product: shippingProduct.product, store, count: shippingProduct.quantity })
        await new Promise(resolve => setTimeout(resolve, shippingProduct.quantity * 1000))
      }
    },
    onSuccess: () => onClose(),
  })

  useEffect(() => {
    reset(shippingProducts)
  }, [reset, shippingProducts])

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col items-stretch gap-8">
        <h2>{t('shipping.printBarcodes.title')}</h2>

        <div className="flex flex-col items-stretch gap-4">
          {map(watch(), (shippingProduct, index) => (
            <div key={shippingProduct.id} className="flex flex-row items-center gap-4">
              <div className="flex-1">
                <CheckoutProductCard
                  withoutPrice
                  productId={shippingProduct.product.id}
                  control={control as any}
                  quantity={shippingProduct.quantity}
                  quantityInputName={`${index}.quantity`}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => onPrintSingle({
                  product: shippingProduct.product,
                  quantity: shippingProduct.quantity,
                })}
                disabled={isPrintingSingle}
              >
                {t('global.print')}
              </Button>
            </div>
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
