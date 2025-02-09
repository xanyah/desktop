import { useCallback, useRef, useState } from 'react'
import { useCurrentStore } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { createShipping } from '../../api'
import { useTranslation } from 'react-i18next'
import { CheckoutProductCard, ProviderSelect, FormContainer, FormSection, Button, RightPanel, ProductForm } from '@/components'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from '../../constants/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ProductSelect from '@/components/product-select'
import { findIndex, map } from 'lodash'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'

const formSchema = z.object({
  providerId: z.string(),
  shippingProductsAttributes: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
    }),
  ),
})

type FormType = z.infer<typeof formSchema>

const Shipping = () => {
  const navigate = useNavigate()
  const store = useCurrentStore()
  const { t } = useTranslation()
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })
  const toastId = useRef<string>(null)
  useBreadCrumbContext([
    { label: t('shippings.pageTitle'), url: '/shippings' },
    { label: t('shippingNew.pageTitle') },
  ])
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'shippingProductsAttributes',
  })

  const { mutate: createApiShipping } = useMutation({
    mutationFn: (newData: any) =>
      createShipping({ ...newData, storeId: store?.id }),
    onSuccess: (data) => {
      navigate(`/shippings/${data.data.id}`)
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
    },
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onError: () => {
      toast.error(t('global.savingError'), { id: toastId?.current || undefined })
    },
  })

  const onSubmit = useCallback((data: FormType) => {
    createApiShipping({ ...data, storeId: store?.id })
  }, [store, createApiShipping])

  const onProductSelect = useCallback((newProductId?: Product['id']) => {
    if (!newProductId) {
      return
    }

    const existingProductIndex = findIndex(fields, { productId: newProductId })

    if (existingProductIndex !== -1) {
      update(existingProductIndex, {
        ...fields[existingProductIndex],
        quantity: fields[existingProductIndex].quantity + 1,
      })
    }
    else {
      append({ productId: newProductId, quantity: 1 })
    }
  }, [fields, append, update])

  return (
    <>
      <FormContainer
        title={t('shippingNew.pageTitle')}
        subtitle={t('shippingNew.pageSubtitle')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormSection title={t('shippingNew.generalInformations')}>
          <Controller
            control={control}
            name="providerId"
            render={({ field: { onChange, value } }) => (
              <ProviderSelect
                onChange={onChange}
                value={value}
                label={t('shippingNew.providerLabel')}
                placeholder={t('shippingNew.providerPlaceholder')}
              />
            )}
          />
          <div className="flex flex-row items-end gap-4">
            <ProductSelect
              onChange={onProductSelect}
              label={t('shippingNew.productLabel')}
              placeholder={t('shippingNew.productPlaceholder')}
            />
            <Button onClick={() => setIsPanelOpen(true)}>
              <Plus />
              {t('shippingNew.newProductButtonLabel')}
            </Button>
          </div>
          {map(fields, (field, index) => (
            <CheckoutProductCard
              withoutPrice
              productId={field.productId}
              quantity={field.quantity}
              key={field.productId}
              onRemove={() => remove(index)}
              onQuantityUpdate={newQuantity => update(index, { ...field, quantity: newQuantity })}
            />
          ))}
        </FormSection>
      </FormContainer>

      <RightPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      >
        <ProductForm
          onCancel={() => setIsPanelOpen(false)}
          onSuccess={({ data }) => {
            onProductSelect(data.id)
            setIsPanelOpen(false)
          }}
        />
      </RightPanel>
    </>
  )
}

export default Shipping
