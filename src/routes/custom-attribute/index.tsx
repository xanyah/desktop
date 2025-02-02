import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useCustomAttribute, useCurrentStore } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCustomAttribute, updateCustomAttribute } from '../../api'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { FormContainer, FormSection, InputText } from '@/components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { z } from '../../constants/zod'
import { find } from 'lodash'
import toast from 'react-hot-toast'

const customAttributeSchema = z.object({
  name: z.string(),
  type: z.enum(['number', 'text']),
})

type CustomAttributeSchemaType = z.infer<typeof customAttributeSchema>

const CustomAttribute = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const store = useCurrentStore()
  const { id } = useParams()
  const { data: customAttributeData } = useCustomAttribute(id)
  const { handleSubmit, control, reset } = useForm<CustomAttributeSchemaType>({
    resolver: zodResolver(customAttributeSchema),
    defaultValues: {},
  })
  const toastId = useRef<string>(null)
  const pageTitle = useMemo(
    () =>
      customAttributeData?.data
        ? customAttributeData?.data.name
        : t('customAttribute.newPageTitle'),
    [t, customAttributeData],
  )

  useBreadCrumbContext([
    { label: t('customAttributes.pageTitle'), url: '/custom-attributes' },
    { label: pageTitle },
  ])

  const types = useMemo(
    () => [
      { label: 'Nombre', value: 'number' },
      { label: 'Texte', value: 'text' },
    ],
    [],
  )

  const { mutate: createApiCustomAttribute } = useMutation({
    mutationFn: (newData: CustomAttributeSchemaType) =>
      createCustomAttribute({ ...newData, storeId: store?.id }),
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: data => {
      queryClient.setQueryData(['customAttributes', { id }], data)
      navigate(`/custom-attributes/${data.data.id}/edit`)
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
    },
    onError: () => {
      toast.error(t('global.savingError'), {
        id: toastId?.current || undefined,
      })
    },
  })

  const { mutate: updateApiCustomAttribute } = useMutation({
    mutationFn: (newData: CustomAttributeSchemaType) =>
      updateCustomAttribute(id, newData),
    onMutate: () => {
      toastId.current = toast.loading(t('global.loading'))
    },
    onSuccess: data => {
      queryClient.setQueryData(['customAttributes', { id }], data)
      toast.success(t('global.saved'), { id: toastId?.current || undefined })
    },
    onError: () => {
      toast.error(t('global.savingError'), {
        id: toastId?.current || undefined,
      })
    },
  })

  const onSubmit = useCallback(
    (data: CustomAttributeSchemaType) => {
      if (id) {
        return updateApiCustomAttribute(data)
      }
      return createApiCustomAttribute(data)
    },
    [id, updateApiCustomAttribute, createApiCustomAttribute],
  )

  useEffect(() => {
    if (customAttributeData?.data) {
      reset(customAttributeData?.data)
    }
  }, [customAttributeData, reset])

  return (
    <FormContainer
      title={pageTitle}
      subtitle={t('customAttribute.pageSubtitle')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormSection title={t('customAttribute.generalInformations')}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('customAttribute.namePlaceholder')}
              type="text"
              label={t('customAttribute.nameLabel')}
            />
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <Select
              options={types}
              onChange={e => onChange(e?.value)}
              value={find(types, { value })}
              placeholder={t('customAttribute.typeLabel')}
            />
          )}
        />
      </FormSection>
    </FormContainer>
  )
}

export default CustomAttribute
