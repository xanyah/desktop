import { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useCurrentStore, useProduct } from '../../hooks'
import { createProduct, updateProduct } from '../../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { showSuccessToast } from '../../utils/notification-helper'
import { validate } from 'uuid'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { formSchema, formSchemaType } from './config'
import { forOwn, isEmpty, map, toNumber } from 'lodash'
import { decamelize } from 'humps'
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

const Product = () => {
  const store = useCurrentStore()
  const { t } = useTranslation()
  const { id } = useParams()
  const { handleSubmit, control, setValue, reset } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
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
    onSuccess: () => {
      showSuccessToast(t('toast.created'))
    },
  })

  const { mutate: updateApiProduct } = useMutation({
    mutationFn: (newData: FormData) => updateProduct(id, newData),
    onSuccess: () => {
      showSuccessToast(t('toast.updated'))
      queryClient.invalidateQueries({ queryKey: ['products', { id }] })
    },
  })

  const onSubmit = useCallback(
    (data: formSchemaType) => {
      const formData = new FormData()
      forOwn(data, (value, key) => {
        if (key !== 'images' && value) {
          formData.append(`product[${decamelize(key)}]`, value.toString())
        }
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
    reset(initialValues)
  }, [initialValues, reset])

  useEffect(() => {
    if (store) {
      setValue('storeId', store?.id)
    }
  }, [store, setValue])

  return (
    <FormContainer
      title={pageTitle}
      subtitle={t('product.pageSubtitle')}
      onSubmit={handleSubmit(onSubmit, err => console.log(err))}
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
              value={value}
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

      <FormSection title="Tarification">
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
    </FormContainer>
  )
}

export default Product
