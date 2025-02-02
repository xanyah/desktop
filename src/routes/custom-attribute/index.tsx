import { useCallback, useEffect, useMemo } from 'react'
import { useCustomAttribute, useCurrentStore } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCustomAttribute, updateCustomAttribute } from '../../api'
import { showSuccessToast } from '../../utils/notification-helper'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { FormContainer, FormSection, InputText } from '@/components'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { z } from '../../constants/zod'
import { find } from 'lodash'

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
  const pageTitle = useMemo(
    () => customAttributeData?.data ? customAttributeData?.data.name : t('customAttribute.newPageTitle'),
    [t, customAttributeData],
  )

  useBreadCrumbContext([
    { label: t('customAttributes.pageTitle'), url: '/custom-attributes' },
    { label: pageTitle },
  ])

  const types = useMemo(() => [
    { label: 'Nombre', value: 'number' },
    { label: 'Texte', value: 'text' },
  ], [])

  const { mutate: createApiCustomAttribute } = useMutation({
    mutationFn: (newData: CustomAttributeSchemaType) =>
      createCustomAttribute({ ...newData, storeId: store?.id }),
    onSuccess: (data) => {
      queryClient.setQueryData(['customAttributes', { id }], data)
      navigate(`/custom-attributes/${data.data.id}/edit`)
      showSuccessToast(
        t('toast.created', { entity: t('models.customAttributes.title') }),
      )
    },
  })

  const { mutate: updateApiCustomAttribute } = useMutation({
    mutationFn: (newData: CustomAttributeSchemaType) => updateCustomAttribute(id, newData),
    onSuccess: (data) => {
      queryClient.setQueryData(['customAttributes', { id }], data)
      showSuccessToast(t('toast.updated'))
    },
  })

  const onSubmit = useCallback((data: CustomAttributeSchemaType) => {
    if (id) {
      return updateApiCustomAttribute(data)
    }
    return createApiCustomAttribute(data)
  }, [id, updateApiCustomAttribute, createApiCustomAttribute])

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
      <FormSection
        title={t('customAttribute.generalInformations')}
      >
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
