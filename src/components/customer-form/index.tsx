import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useCustomer, useCurrentStore } from '../../hooks'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCustomer, updateCustomer } from '../../api'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { customerSchema, customerSchemaType } from './config'
import { Controller, useForm } from 'react-hook-form'
import { FormContainer, FormSection, InputText } from '@/components'
import toast from 'react-hot-toast'
import { AxiosResponse } from 'axios'

type CustomerFormProps = {
  onCancel?: () => void
  onSuccess?: (data: AxiosResponse<Customer, any>) => void
  isPanelForm?: boolean
}

const CustomerForm = ({
  onCancel,
  onSuccess,
  isPanelForm = false,
}: CustomerFormProps) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const store = useCurrentStore()
  const { id } = useParams()
  const toastId = useRef<string>(null)
  const { data: customerData } = useCustomer(id)
  const { handleSubmit, control, reset } = useForm<customerSchemaType>({
    resolver: zodResolver(customerSchema),
    defaultValues: {},
  })

  const pageTitle = useMemo(
    () =>
      customerData?.data
        ? `${customerData?.data.firstname} ${customerData?.data.lastname}`
        : t('customer.newPageTitle'),
    [t, customerData],
  )

  const { mutate: createApiCustomer } = useMutation({
    mutationFn: (newData: customerSchemaType) =>
      createCustomer({ ...newData, storeId: store?.id }),
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['customers', { id: data.data.id }], data)
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
      onSuccess?.(data)
    },
    onError: () => {
      toast.error(t('global.savingError'), {
        id: toastId?.current || undefined,
      })
    },
  })

  const { mutate: updateApiCustomer } = useMutation({
    mutationFn: (newData: customerSchemaType) => updateCustomer(id, newData),
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['customers', { id }], data)
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
    },
    onError: () => {
      toast.error(t('global.savingError'), {
        id: toastId?.current || undefined,
      })
    },
  })

  const onSubmit = useCallback(
    (data: customerSchemaType) => {
      if (id && !isPanelForm) {
        return updateApiCustomer(data)
      }
      return createApiCustomer(data)
    },
    [id, updateApiCustomer, createApiCustomer, isPanelForm],
  )

  useEffect(() => {
    reset(customerData?.data)
  }, [customerData, reset])

  return (
    <FormContainer
      title={pageTitle}
      subtitle={t('customer.pageSubtitle')}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={onCancel}
    >
      <FormSection title={t('customer.generalInformations')}>
        <Controller
          control={control}
          name="firstname"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('customer.firstnamePlaceholder')}
              type="text"
              label={t('customer.firstnameLabel')}
            />
          )}
        />
        <Controller
          control={control}
          name="lastname"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('customer.lastnamePlaceholder')}
              type="text"
              label={t('customer.lastnameLabel')}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('customer.phonePlaceholder')}
              type="text"
              label={t('customer.phoneLabel')}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('customer.emailPlaceholder')}
              type="text"
              label={t('customer.emailLabel')}
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('customer.addressPlaceholder')}
              type="text"
              label={t('customer.addressLabel')}
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
              placeholder={t('customer.notesPlaceholder')}
              type="text"
              label={t('customer.notesLabel')}
            />
          )}
        />
      </FormSection>
    </FormContainer>
  )
}

export default CustomerForm
