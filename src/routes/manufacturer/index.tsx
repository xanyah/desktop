import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useManufacturer, useCurrentStore } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createManufacturer, updateManufacturer } from '../../api'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { manufacturerSchema, manufacturerSchemaType } from './config'
import { Controller, useForm } from 'react-hook-form'
import { FormContainer, FormSection, InputText } from '@/components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import toast from 'react-hot-toast'

const Manufacturer = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const store = useCurrentStore()
  const { id } = useParams()
  const toastId = useRef<string>(null)
  const { data: manufacturerData } = useManufacturer(id)
  const { handleSubmit, control, reset } = useForm<manufacturerSchemaType>({
    resolver: zodResolver(manufacturerSchema),
    defaultValues: {},
  })

  const pageTitle = useMemo(
    () => manufacturerData?.data ? manufacturerData?.data.name : t('manufacturer.newPageTitle'),
    [t, manufacturerData],
  )

  useBreadCrumbContext([
    { label: t('manufacturers.pageTitle'), url: '/manufacturers' },
    { label: pageTitle },
  ])

  const { mutate: createApiManufacturer } = useMutation({
    mutationFn: (newData: manufacturerSchemaType) =>
      createManufacturer({ ...newData, storeId: store?.id }),
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['manufacturers', { id }], data)
      navigate(`/manufacturers/${data.data.id}/edit`)
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
    },
    onError: () => {
      toast.error(t('global.savingError'), { id: toastId?.current || undefined })
    },
  })

  const { mutate: updateApiManufacturer } = useMutation({
    mutationFn: (newData: manufacturerSchemaType) => updateManufacturer(id, newData),
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['manufacturers', { id }], data)
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
    },
    onError: () => {
      toast.error(t('global.savingError'), { id: toastId?.current || undefined })
    },
  })

  const onSubmit = useCallback((data: manufacturerSchemaType) => {
    if (id) {
      return updateApiManufacturer(data)
    }
    return createApiManufacturer(data)
  }, [id, updateApiManufacturer, createApiManufacturer])

  useEffect(() => {
    reset(manufacturerData?.data)
  }, [manufacturerData, reset])

  return (
    <FormContainer
      title={pageTitle}
      subtitle={t('manufacturer.pageSubtitle')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormSection
        title={t('manufacturer.generalInformations')}
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              id="name"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('manufacturer.namePlaceholder')}
              type="text"
              label={t('manufacturer.nameLabel')}
            />
          )}
        />
        <Controller
          control={control}
          name="code"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              id="code"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('manufacturer.codePlaceholder')}
              type="text"
              hint={t('manufacturer.codeHint')}
              label={t('manufacturer.codeLabel')}
            />
          )}
        />

        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('manufacturer.notesPlaceholder')}
              type="text"
              label={t('manufacturer.notesPlaceholder')}
            />
          )}
        />
      </FormSection>
    </FormContainer>
  )
}

export default Manufacturer
