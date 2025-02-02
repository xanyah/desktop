import { useCallback, useEffect, useMemo, useRef } from 'react'

import { useProvider, useCurrentStore } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProvider, updateProvider } from '../../api'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { providerSchema, providerSchemaType } from './config'
import { Controller, useForm } from 'react-hook-form'
import { FormContainer, FormSection, InputText } from '@/components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import toast from 'react-hot-toast'

const Provider = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const toastId = useRef<string>(null)
  const navigate = useNavigate()
  const store = useCurrentStore()
  const { id } = useParams()
  const { data: providerData } = useProvider(id)
  const { handleSubmit, control, reset } = useForm<providerSchemaType>({
    resolver: zodResolver(providerSchema),
    defaultValues: {},
  })
  const pageTitle = useMemo(
    () => providerData?.data ? providerData?.data.name : t('provider.newPageTitle'),
    [t, providerData],
  )
  useBreadCrumbContext([
    { label: t('providers.pageTitle'), url: '/providers' },
    { label: pageTitle },
  ])

  const { mutate: createApiProvider } = useMutation({
    mutationFn: (newData: providerSchemaType) =>
      createProvider({ ...newData, storeId: store?.id }),
    onSuccess: (data) => {
      queryClient.setQueryData(['providers', { id }], data)
      navigate(`/providers/${data.data.id}/edit`)
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
    },
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onError: () => {
      toast.error(t('global.savingError'), { id: toastId?.current || undefined })
    },
  })

  const { mutate: updateApiProvider } = useMutation({
    mutationFn: (newData: providerSchemaType) => updateProvider(id, newData),
    onSuccess: (data) => {
      queryClient.setQueryData(['providers', { id }], data)
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
    },
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onError: () => {
      toast.error(t('global.savingError'), { id: toastId?.current || undefined })
    },
  })

  const onSubmit = useCallback((data: providerSchemaType) => {
    if (id) {
      return updateApiProvider(data)
    }
    return createApiProvider(data)
  }, [id, updateApiProvider, createApiProvider])

  useEffect(() => {
    reset(providerData?.data)
  }, [providerData, reset])

  return (
    <FormContainer
      title={pageTitle}
      subtitle={t('provider.pageSubtitle')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormSection
        title={t('provider.generalInformations')}
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('provider.namePlaceholder')}
              type="text"
              label={t('provider.nameLabel')}
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
              placeholder={t('provider.notesPlaceholder')}
              type="text"
              label={t('provider.notesLabel')}
            />
          )}
        />
      </FormSection>
    </FormContainer>
  )
}

export default Provider
