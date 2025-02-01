import { useCallback, useEffect, useMemo} from 'react'


import { useProvider, useCurrentStore } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProvider, updateProvider } from "../../api";
import { showSuccessToast } from "../../utils/notification-helper";
import { useTranslation } from "react-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import { providerSchema, providerSchemaType } from './config';
import { Controller, useForm } from 'react-hook-form';
import { FormContainer, FormSection, InputText } from '@/components';
import { useBreadCrumbContext } from '@/contexts/breadcrumb';

const Provider = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation();
  const navigate = useNavigate();
  const store = useCurrentStore();
  const { id } = useParams();
  const { data: providerData } = useProvider(id);
  const { handleSubmit, control, reset } = useForm<providerSchemaType>({
    resolver: zodResolver(providerSchema),
    defaultValues: {},
  })
  const pageTitle = useMemo(
    () => providerData?.data ? providerData?.data.name : t('provider.newPageTitle'),
    [t,providerData]
  )
  useBreadCrumbContext([
    { label: t('providers.pageTitle'), url: '/providers'},
    { label: pageTitle},
  ])

  const { mutate: createApiProvider } = useMutation({
    mutationFn: (newData: providerSchemaType) =>
      createProvider({ ...newData, storeId: store?.id }),
    onSuccess: (data) => {
      queryClient.setQueryData(['providers', {id}], data)
      navigate(`/providers/${data.data.id}/edit`);
      showSuccessToast(
        t("toast.created", { entity: t("models.providers.title") })
      );
    },
  });

  const { mutate: updateApiProvider } = useMutation({
    mutationFn: (newData: providerSchemaType) => updateProvider(id, newData),
    onSuccess: (data) => {
      queryClient.setQueryData(['providers', {id}], data)
      showSuccessToast(t("toast.updated"));
    },
  });

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
      subtitle={t('providers.pageSubtitle')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormSection
        title={t('providers.generalInformations')}
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder={t('providers.namePlaceholder')}
              type="text"
              label={t('providers.nameLabel')}
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
              placeholder={t('providers.notesPlaceholder')}
              type="text"
              label={t('providers.notesLabel')}
            />
          )}
        />
      </FormSection>
    </FormContainer>
  )
}

export default Provider;
