import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useCurrentStore, useCustomAttributes, useLocalStorage } from '../../hooks'
import { archiveProduct, createProduct, unarchiveProduct, updateProduct } from '../../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { find, isEmpty, last, map, omit, split } from 'lodash'
import { decamelizeKeys } from 'humps'
import { Button, FormContainer } from '@/components'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { AxiosResponse } from 'axios'
import { serialize } from 'object-to-formdata'
import ProductFormGeneral from './general'
import ProductFormLogistics from './logistics'
import ProductFormPricing from './pricing'
import ProductFormCustomAttributes from './custom-attributes'
import { formSchema, formSchemaType } from './config'

type ProductFormProps = {
  product?: Product
  onCancel?: () => void
  onSuccess?: (data: AxiosResponse<Product, any>) => void
}

const ProductForm = ({ onCancel, onSuccess, product }: ProductFormProps) => {
  const store = useCurrentStore()
  const { data: customAttributesData } = useCustomAttributes({
    'q[storeIdEq]': store?.id,
  })
  const { t } = useTranslation()
  const methods = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const { handleSubmit, setValue, reset } = methods
  const toastId = useRef<string>(null)
  const pageTitle = useMemo(
    () => product?.name || t('product.newPageTitle'),
    [product, t],
  )
  const [defaultVatRateId] = useLocalStorage('defaultVatRateId')
  const queryClient = useQueryClient()

  const initialValues = useMemo(
    () =>
      product
        ? {
            ...product,
            categoryId: product.category?.id,
            manufacturerId: product.manufacturer?.id,
            storeId: store?.id,
            buyingAmount: product.buyingAmountCents,
            taxFreeAmount: product.taxFreeAmountCents,
            amount: product.amountCents,
            vatRateId: product.vatRate?.id,
            description: product.description || '',
            images: map(product.images, image => ({
              name: last(split(image.large, '/')),
              signed_id: image.signedId,
              thumbnail: image.thumbnail,
            })),
          }
        : {
            vatRateId: defaultVatRateId,
            productCustomAttributes: [],
          },
    [product, store, defaultVatRateId],
  )

  const { mutate: createApiProduct } = useMutation({
    mutationFn: (newData: FormData) => createProduct(newData),
    onSuccess: (data) => {
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
      onSuccess?.(data)
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

  const invalidateProduct = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['products', { id: product?.id }],
    })
  }, [queryClient, product])

  const { mutate: updateApiProduct } = useMutation({
    mutationFn: (newData: FormData) => updateProduct(product?.id, newData),
    onSuccess: (data) => {
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
      invalidateProduct()
      onSuccess?.(data)
      reset(initialValues)
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

  const { mutate: archiveApiProduct } = useMutation({
    mutationFn: () => archiveProduct(product?.id),
    onSuccess: invalidateProduct,
  })

  const { mutate: unarchiveApiProduct } = useMutation({
    mutationFn: () => unarchiveProduct(product?.id),
    onSuccess: invalidateProduct,
  })

  const onSubmit = useCallback(
    (data: formSchemaType) => {
      const formData = serialize({
        product: omit(decamelizeKeys(data), 'images'),
      })

      if (!isEmpty(data.images) && data.images) {
        data.images.forEach((item) => {
          if (item instanceof File) {
            formData.append('product[images][]', item)
          }
          else if (item.signed_id) {
            formData.append('product[images][]', item.signed_id)
          }
        })
      }
      else {
        formData.append('product[images][]', '')
      }

      if (product) {
        updateApiProduct(formData)
      }
      else {
        createApiProduct(formData)
      }
    },
    [product, updateApiProduct, createApiProduct],
  )

  const printTicket = useCallback(() => {
    if (product && store) {
      window.electronAPI.printBarcode({ product, store, count: 1 })
        .then(() => console.log('ok'))
        .catch(console.error)
    }
  }, [product, store])

  useEffect(() => {
    setValue(
      'productCustomAttributesAttributes',
      map(customAttributesData?.data, (customAttribute) => {
        const existingCustomAttribute = find(
          initialValues?.productCustomAttributes,
          productCustomAttribute =>
            productCustomAttribute.customAttribute.id === customAttribute.id,
        )
        return {
          id: existingCustomAttribute?.id,
          customAttributeId: customAttribute.id,
          value: existingCustomAttribute?.value,
        }
      }),
    )
  }, [initialValues, customAttributesData, setValue])

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  useEffect(() => {
    if (store) {
      setValue('storeId', store?.id)
    }
  }, [setValue, store])

  return (
    <FormProvider {...methods}>
      <input {...methods.register('storeId')} type="hidden" />
      <FormContainer
        title={pageTitle}
        subtitle={t('product.pageSubtitle')}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={onCancel}
        button={(
          <div className="flex flex-row gap-4">
            {product?.archivedAt
              ? <Button onClick={() => unarchiveApiProduct()} type="button" variant="ghost">{t('global.unarchive')}</Button>
              : <Button onClick={() => archiveApiProduct()} type="button" color="red">{t('global.archive')}</Button>}
            <Button onClick={printTicket} type="button">{t('product.printLabel')}</Button>
          </div>
        )}
      >
        <ProductFormGeneral />
        <ProductFormLogistics />
        <ProductFormPricing />
        <ProductFormCustomAttributes />
      </FormContainer>
    </FormProvider>
  )
}

export default ProductForm
