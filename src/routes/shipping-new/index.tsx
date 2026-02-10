import { useCallback, useRef, useState } from 'react'
import { useCurrentStore } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { createShipping } from '../../api'
import { useTranslation } from 'react-i18next'
import {
  ProviderSelect,
  FormContainer,
  FormSection,
  Button,
  RightPanel,
  ProductForm,
  Dialog,
  ProductSearchForm,
  ShippingProductCard,
} from '@/components'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from '../../constants/zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
      newBuyingAmountCents: z.string().optional(),
      newSellingAmountCents: z.string().optional(),
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

  const [existingProductIndex, setExistingProductIndex] = useState<
    number | null
  >(null)

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
      toast.error(t('global.savingError'), {
        id: toastId?.current || undefined,
      })
    },
  })

  const onSubmit = useCallback(
    (data: FormType) => {
      createApiShipping({ ...data, storeId: store?.id })
    },
    [store, createApiShipping],
  )

  const onAddExistingProduct = useCallback(() => {
    if (existingProductIndex === null) {
      return
    }

    update(existingProductIndex, {
      ...fields[existingProductIndex],
      quantity: fields[existingProductIndex].quantity + 1,
    })

    setExistingProductIndex(null)
  }, [existingProductIndex, fields, update])

  const onProductSelect = useCallback(
    (newProduct?: Product) => {
      if (!newProduct) {
        return
      }

      const isExistingProductIndex = findIndex(fields, {
        productId: newProduct.id,
      })

      if (isExistingProductIndex !== -1) {
        setExistingProductIndex(isExistingProductIndex)
      }
      else {
        append({ productId: newProduct.id, quantity: 1 })
      }
    },
    [fields, append],
  )

  return (
    <>
      <FormContainer
        title={t('shippingNew.pageTitle')}
        subtitle={t('shippingNew.pageSubtitle')}
        isNotForm
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
            <ProductSearchForm onProductSelect={onProductSelect} />
            <Button type="button" onClick={() => setIsPanelOpen(true)}>
              <Plus />
              {t('shippingNew.newProductButtonLabel')}
            </Button>
          </div>
          {map(fields, (field, index) => (
            <ShippingProductCard
              productId={field.productId}
              newBuyingAmountInputName={`shippingProductsAttributes.${index}.newBuyingAmountCents`}
              newSellingAmountInputName={`shippingProductsAttributes.${index}.newSellingAmountCents`}
              quantityInputName={`shippingProductsAttributes.${index}.quantity`}
              key={field.productId}
              onRemove={() => remove(index)}
              control={control}
            />
          ))}
        </FormSection>
        <Button className="self-end" onClick={handleSubmit(onSubmit)}>
          {t('global.save')}
        </Button>
      </FormContainer>

      <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <ProductForm
          onCancel={() => setIsPanelOpen(false)}
          onSuccess={({ data }) => {
            onProductSelect(data)
            setIsPanelOpen(false)
          }}
        />
      </RightPanel>

      <Dialog
        open={existingProductIndex !== null}
        onClose={() => setExistingProductIndex(null)}
        title={t('shipping.existingProduct.title')}
        footer={(
          <>
            <Button
              variant="outline"
              onClick={() => setExistingProductIndex(null)}
            >
              {t('global.cancel')}
            </Button>
            <Button onClick={onAddExistingProduct}>
              {t('global.confirm')}
            </Button>
          </>
        )}
      >
        {t('shipping.existingProduct.description')}
      </Dialog>
    </>
  )
}

export default Shipping
