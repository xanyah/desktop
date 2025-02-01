import { useCallback, useEffect, useMemo } from 'react'
import { useManufacturer, useCurrentStore } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createManufacturer, updateManufacturer } from "../../api";
import { showSuccessToast } from "../../utils/notification-helper";
import { useTranslation } from "react-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import { manufacturerSchema, manufacturerSchemaType } from './config';
import { Controller, useForm } from 'react-hook-form';
import { FormContainer, FormSection, InputText } from '@/components';
import { useBreadCrumbContext } from '@/contexts/breadcrumb';

const Manufacturer = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation();
  const navigate = useNavigate();
  const store = useCurrentStore();
  const { id } = useParams();
  const { data: manufacturerData } = useManufacturer(id);
  const { handleSubmit, control, reset } = useForm<manufacturerSchemaType>({
    resolver: zodResolver(manufacturerSchema),
    defaultValues: {},
  })

  const pageTitle = useMemo(
    () => manufacturerData?.data ? manufacturerData?.data.name : t('manufacturer.newPageTitle'),
    [t,manufacturerData]
  )

  useBreadCrumbContext([
    { label: t('manufacturers.pageTitle'), url: '/manufacturers'},
    { label:pageTitle },
  ])

  const { mutate: createApiManufacturer } = useMutation({
    mutationFn: (newData: manufacturerSchemaType) =>
      createManufacturer({ ...newData, storeId: store?.id }),
    onSuccess: (data) => {
      queryClient.setQueryData(['manufacturers', {id}], data)
      navigate(`/manufacturers/${data.data.id}/edit`);
      showSuccessToast(
        t("toast.created", { entity: t("models.manufacturers.title") })
      );
    },
  });

  const { mutate: updateApiManufacturer } = useMutation({
    mutationFn: (newData: manufacturerSchemaType) => updateManufacturer(id, newData),
    onSuccess: (data) => {
      queryClient.setQueryData(['manufacturers', {id}], data)
      showSuccessToast(t("toast.updated"));
    },
  });

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

export default Manufacturer;
