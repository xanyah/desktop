import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useCurrentStore, useCustomAttributes, useProduct } from '../../hooks'
import { createProduct, updateProduct } from '../../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { validate } from 'uuid'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { find, isEmpty, map, omit, toNumber } from 'lodash'
import { decamelizeKeys } from 'humps'
import {
  CategorySelect,
  FormContainer,
  FormSection,
  InputFile,
  InputText,
  ManufacturerSelect,
} from '@/components'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Euro } from 'lucide-react'
import toast from 'react-hot-toast'
import { z } from '../../constants/zod'
import { AxiosResponse } from 'axios'
import { serialize } from 'object-to-formdata'

const ImageSchema = z.union([
  z.instanceof(File),
  z.object({
    name: z.string(),
    signed_id: z.string(),
  }),
])

const productCustomAttributesAttributes = z.object({
  id: z.string().optional(),
  customAttributeId: z.string(),
  value: z.string().optional().nullable(),
})

const formSchema = z.object({
  name: z.string(),
  categoryId: z.string(),
  manufacturerId: z.string(),
  storeId: z.string(),
  amount: z.number(),
  buyingAmount: z.number(),
  taxFreeAmount: z.number(),
  sku: z.string(),
  manufacturerSku: z.string(),
  upc: z.string(),
  images: z.array(ImageSchema).optional(),
  productCustomAttributesAttributes: z.array(productCustomAttributesAttributes.optional().nullable()).optional(),
})

type formSchemaType = z.infer<typeof formSchema>

type ProductFormProps = {
  onCancel?: () => void
  onSuccess?: (data: AxiosResponse<Product, any>) => void
}

const ProductForm = ({ onCancel, onSuccess }: ProductFormProps) => {
  const store = useCurrentStore()
  const { data: customAttributesData } = useCustomAttributes({
    'q[storeIdEq]': store?.id,
  })
  const { t } = useTranslation()
  const { id } = useParams()
  const { handleSubmit, control, setValue, reset } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const toastId = useRef<string>(null)
  const { data: productData } = useProduct(id)
  const pageTitle = useMemo(
    () => productData?.data?.name || t('product.newPageTitle'),
    [productData, t],
  )
  const queryClient = useQueryClient()
  useBreadCrumbContext([
    { label: t('products.pageTitle'), url: '/products' },
    { label: pageTitle },
  ])
  const initialValues = useMemo(
    () =>
      productData?.data
        ? {
            ...productData?.data,
            categoryId: productData?.data?.category?.id,
            manufacturerId: productData?.data?.manufacturer?.id,
            storeId: store?.id,
            buyingAmount: productData?.data?.buyingAmountCents / 100,
            taxFreeAmount: productData?.data?.taxFreeAmountCents / 100,
            amount: productData?.data?.amountCents / 100,
            images: map(productData?.data?.images, image => ({
              name: image.large.split('/').pop(),
              signed_id: image.signedId,
              thumbnail: image.thumbnail,
            })),
          }
        : undefined,
    [productData, store],
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

  const { mutate: updateApiProduct } = useMutation({
    mutationFn: (newData: FormData) => updateProduct(id, newData),
    onSuccess: (data) => {
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
      queryClient.invalidateQueries({ queryKey: ['products', { id }] })
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

  const onSubmit = useCallback(
    (data: formSchemaType) => {
      const formData = serialize({ product: omit(decamelizeKeys(data), 'images') })

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

      console.log(formData)

      if (validate(id)) {
        updateApiProduct(formData)
      }
      else {
        createApiProduct(formData)
      }
    },
    [id, updateApiProduct, createApiProduct],
  )

  useEffect(() => {
    reset({
      ...initialValues,
      productCustomAttributesAttributes: map(customAttributesData?.data, (customAttribute) => {
        const existingCustomAttribute = find(
          initialValues?.productCustomAttributes,
          productCustomAttribute => productCustomAttribute.customAttribute.id === customAttribute.id,
        )
        return {
          id: existingCustomAttribute?.id,
          customAttributeId: customAttribute.id,
          value: existingCustomAttribute?.value,
        }
      }),
    })
  }, [initialValues, reset, customAttributesData])

  useEffect(() => {
    if (store) {
      setValue('storeId', store?.id)
    }
  }, [store, setValue])

  return (
    <FormContainer
      title={pageTitle}
      subtitle={t('product.pageSubtitle')}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={onCancel}
    >
      <FormSection title={t('product.generalInformations')}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('product.namePlaceholder')}
              type="text"
              label={t('product.nameLabel')}
            />
          )}
        />

        <Controller
          control={control}
          name="categoryId"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CategorySelect
              error={error?.message}
              onChange={onChange}
              value={value}
              label={t('product.categoryLabel')}
              placeholder={t('product.categoryPlaceholder')}
            />
          )}
        />
        <Controller
          control={control}
          name="manufacturerId"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <ManufacturerSelect
              error={error?.message}
              onChange={onChange}
              value={value}
              label={t('product.manufacturerLabel')}
              placeholder={t('product.manufacturerPlaceholder')}
            />
          )}
        />

        <Controller
          control={control}
          name="images"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputFile
              label={t('product.imagesLabel')}
              error={error?.message}
              id="file-upload"
              onFilesChange={onChange}
              value={value as any}
            />
          )}
        />
      </FormSection>

      <FormSection title={t('product.logistics')}>
        <Controller
          control={control}
          name="manufacturerSku"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              hint={t('product.manufacturerSkuHint')}
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('product.manufacturerSkuPlaceholder')}
              type="text"
              label={t('product.manufacturerSkuLabel')}
            />
          )}
        />

        <Controller
          control={control}
          name="upc"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              hint={t('product.upcHint')}
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('product.upcPlaceholder')}
              type="text"
              label={t('product.upcLabel')}
            />
          )}
        />

        <Controller
          control={control}
          name="sku"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              hint={t('product.skuHint')}
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('product.skuPlaceholder')}
              type="text"
              label={t('product.skuLabel')}
            />
          )}
        />
      </FormSection>

      <FormSection title={t('product.pricing')}>
        <Controller
          control={control}
          name="buyingAmount"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              icon={<Euro />}
              step="0.1"
              type="number"
              hint={t('product.buyingAmountHint')}
              placeholder={t('product.buyingAmountPlaceholder')}
              label={t('product.buyingAmountLabel')}
              value={value}
              onChange={e => onChange(toNumber(e.target.value))}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="taxFreeAmount"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              icon={<Euro />}
              step="0.1"
              type="number"
              hint={t('product.taxFreeAmountHint')}
              placeholder={t('product.taxFreeAmountPlaceholder')}
              label={t('product.taxFreeAmountLabel')}
              value={value}
              onChange={e => onChange(toNumber(e.target.value))}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            // TODO: Should be tax_free amount * category.vat_rate
            <InputText
              icon={<Euro />}
              step="0.1"
              type="number"
              hint={t('product.amountHint')}
              placeholder={t('product.amountPlaceholder')}
              label={t('product.amountLabel')}
              value={value}
              onChange={e => onChange(toNumber(e.target.value))}
              error={error?.message}
            />
          )}
        />
      </FormSection>

      {!isEmpty(customAttributesData?.data) && (
        <FormSection title={t('product.customAttributes')}>
          {map(customAttributesData?.data, (customAttribute, index) => (
            <Controller
              control={control}
              name={`productCustomAttributesAttributes.${index}`}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <InputText
                  placeholder={customAttribute.name}
                  label={customAttribute.name}
                  value={value?.value || ''}
                  onChange={e => onChange({
                    id: value?.id,
                    customAttributeId: customAttribute.id,
                    value: e.target.value,
                  })}
                  error={error?.message}
                />
              )}
            />
          ))}
        </FormSection>
      )}
    </FormContainer>
  )
}

export default ProductForm
