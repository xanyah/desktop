import { useCallback, useEffect, useRef, useState } from 'react'
import { useShipping, useShippingProducts } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { updateShipping } from '../../api'
import { useTranslation } from 'react-i18next'
import {
  CheckoutProductCard,
  FormContainer,
  Button,
  RightPanel,
  ProductForm,
  Dialog,
  ShowSection,
  ProductSearchForm,
} from '@/components'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from '../../constants/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { findIndex, map, pick } from 'lodash'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'

const formSchema = z.object({
  shippingProductsAttributes: z.array(
    z.object({
      id: z.string().optional(),
      productId: z.string(),
      quantity: z.number(),
      _destroy: z.boolean().optional(),
    }),
  ),
})

type FormType = z.infer<typeof formSchema>

const ShippingEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const { handleSubmit, control, reset, formState } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })
  const toastId = useRef<string>(null)
  useBreadCrumbContext([
    { label: t('shippings.pageTitle'), url: '/shippings' },
    { label: t('shippingNew.pageTitle') },
  ])
  const { data: shippingData } = useShipping(id)
  const { data: shippingProductsData } = useShippingProducts({
    'q[shippingIdEq]': id,
  })
  const { fields, update, append } = useFieldArray({
    keyName: 'rhfId',
    control,
    name: 'shippingProductsAttributes',
  })

  const [existingProductIndex, setExistingProductIndex] = useState<
    number | null
  >(null)

  const { mutate: createApiShipping } = useMutation({
    mutationFn: (newData: any) =>
      updateShipping(id, newData),
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
      createApiShipping({
        ...data,
        shippingProductsAttributes: map(data.shippingProductsAttributes, shippingProduct =>
          shippingProduct._destroy
            ? pick(shippingProduct, ['_destroy', 'id'])
            : shippingProduct,
        ),
      })
    },
    [createApiShipping],
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
    (newProductId?: Product['id']) => {
      if (!newProductId) {
        return
      }

      const isExistingProductIndex = findIndex(fields, {
        productId: newProductId,
      })

      if (isExistingProductIndex !== -1) {
        setExistingProductIndex(isExistingProductIndex)
      }
      else {
        append({ productId: newProductId, quantity: 1 })
      }
    },
    [append, fields],
  )

  useEffect(() => {
    if (shippingProductsData?.data && !formState.isDirty) {
      reset({
        shippingProductsAttributes: map(shippingProductsData.data, shippingProduct => ({
          id: shippingProduct.id,
          quantity: shippingProduct.quantity,
          productId: shippingProduct.product.id,
        })),
      })
    }
  }, [shippingProductsData, reset, formState.isDirty])

  return (
    <>
      <FormContainer
        title={t('shippingNew.pageTitle')}
        subtitle={t('shippingNew.pageSubtitle')}
        isNotForm
      >
        <ShowSection title={t('shipping.provider')}>
          <div className="flex flex-col gap-2">
            <p>{shippingData?.data.provider.name}</p>
          </div>
        </ShowSection>
        <div className="flex flex-row items-end gap-4">
          <ProductSearchForm onProductSelect={product => onProductSelect(product.id)} />
          <Button type="button" onClick={() => setIsPanelOpen(true)}>
            <Plus />
            {t('shippingNew.newProductButtonLabel')}
          </Button>
        </div>

        {map(fields, (field, index) => (
          <CheckoutProductCard
            withoutPrice
            productId={field.productId}
            quantity={field.quantity}
            key={field.rhfId}
            control={control}
            quantityInputName={`shippingProductsAttributes.${index}.quantity`}
            willBeRemoved={field._destroy}
            onRemoveCancel={() => update(index, { ...field, _destroy: undefined })}
            onRemove={() => update(index, { ...field, _destroy: true })}
          />
        ))}
        <Button className="self-end" onClick={handleSubmit(onSubmit)}>
          {t('global.save')}
        </Button>
      </FormContainer>

      <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <ProductForm
          onCancel={() => setIsPanelOpen(false)}
          onSuccess={({ data }) => {
            onProductSelect(data.id)
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

export default ShippingEdit
