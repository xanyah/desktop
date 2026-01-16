import { useCallback, useEffect, useRef } from 'react'
import { useCurrentStore } from '../../hooks'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStore } from '../../api'
import { CountrySelect, FormContainer, FormSection, InputColor, InputText, InputTextarea } from '../../components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { z } from '../../constants'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  address1: z.string().nullable().optional(),
  address2: z.string().nullable().optional(),
  zipcode: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  websiteUrl: z.string().nullable().optional(),
  phoneNumber: z.string().nullable().optional(),
  emailAddress: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  openaiApiKey: z.string().nullable().optional(),
  aiPrompt: z.string().nullable().optional(),
  countryId: z.string(),
  key: z.string(),
  name: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

const Store = () => {
  const store = useCurrentStore()
  const { t } = useTranslation()
  useBreadCrumbContext([
    { label: store?.name || t('store.pageTitle') },
  ])
  const queryClient = useQueryClient()
  const toastId = useRef<string>(null)
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) })

  const { mutate, isPending } = useMutation(
    {
      mutationFn: (data: FormSchema) => updateStore(store?.id, data),
      onMutate: () => {
        toastId.current = toast.loading(t('global.loading'))
      },
      onSuccess: () => {
        toast.success(t('global.saved'), { id: toastId?.current || undefined })
        queryClient.invalidateQueries({ queryKey: ['stores'] })
      },
      onError: () => {
        toast.success(t('global.savingError'), { id: toastId?.current || undefined })
      },
    },
  )

  const onSubmit = useCallback(
    (data: FormSchema) => {
      mutate(data)
    },
    [mutate],
  )

  useEffect(() => {
    if (store) {
      reset({
        ...store,
        countryId: store.country.id,
      })
    }
  }, [store, reset])

  return (
    <FormContainer
      isLoading={isPending}
      onSubmit={handleSubmit(onSubmit)}
      title={t('store.pageTitle')}
      subtitle={t('store.pageSubtitle')}
    >
      <FormSection title={t('store.generalInformations')}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('store.namePlaceholder')}
              type="text"
              label={t('store.nameLabel')}
            />
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value || ''}
              placeholder={t('store.phoneNumberPlaceholder')}
              type="text"
              label={t('store.phoneNumberLabel')}
            />
          )}
        />
        <Controller
          control={control}
          name="emailAddress"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value || ''}
              placeholder={t('store.emailAddressPlaceholder')}
              type="text"
              label={t('store.emailAddressLabel')}
            />
          )}
        />
        <Controller
          control={control}
          name="websiteUrl"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value || ''}
              placeholder={t('store.websiteUrlPlaceholder')}
              type="text"
              label={t('store.websiteUrlLabel')}
            />
          )}
        />
      </FormSection>
      <FormSection title={t('store.address')}>
        <Controller
          control={control}
          name="address1"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value || ''}
              placeholder={t('store.address1Placeholder')}
              type="text"
              label={t('store.address1Label')}
            />
          )}
        />
        <Controller
          control={control}
          name="address2"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value || ''}
              placeholder={t('store.address2Placeholder')}
              type="text"
              label={t('store.address2Label')}
            />
          )}
        />
        <Controller
          control={control}
          name="zipcode"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value || ''}
              placeholder={t('store.zipcodePlaceholder')}
              type="text"
              label={t('store.zipcodeLabel')}
            />
          )}
        />
        <Controller
          control={control}
          name="countryId"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CountrySelect
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('store.countryPlaceholder')}
              label={t('store.countryLabel')}
            />
          )}
        />
      </FormSection>
      <FormSection title={t('store.customization')}>
        <Controller
          control={control}
          name="color"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputColor
              colors={['#ef4444', '#f97316', '#f59e0b', '#facc15', '#84cc16', '#10b981', '#14b8a6', '#22d3ee', '#38bdf8', '#60a5fa', '#4f46e5', '#a855f7', '#ec4899', '#f43f5e']}
              error={error?.message}
              onChange={onChange}
              value={value || ''}
              label={t('store.colorLabel')}
            />
          )}
        />
      </FormSection>
      <FormSection title={t('store.integrations')}>
        <Controller
          control={control}
          name="openaiApiKey"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value || ''}
              placeholder={t('store.openaiApiKeyPlaceholder')}
              type="password"
              label={t('store.openaiApiKeyLabel')}
              hint={t('store.openaiApiKeyHint')}
            />
          )}
        />
        <Controller
          control={control}
          name="aiPrompt"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputTextarea
              error={error?.message}
              onChange={onChange}
              value={value || ''}
              placeholder={t('store.aiPromptPlaceholder')}
              label={t('store.aiPromptLabel')}
              hint={t('store.aiPromptHint')}
              rows={4}
            />
          )}
        />
      </FormSection>
    </FormContainer>
  )
}

export default Store
