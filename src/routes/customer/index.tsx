import { useCallback, useEffect, useMemo } from 'react'
import { useCustomer, useCurrentStore } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer, updateCustomer } from "../../api";
import { showSuccessToast } from "../../utils/notification-helper";
import { useTranslation } from "react-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, customerSchemaType } from './config';
import { Controller, useForm } from 'react-hook-form';
import { FormContainer, FormSection, InputText } from '@/components';
import { useBreadCrumbContext } from '@/contexts/breadcrumb';

const Customer = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation();
  const navigate = useNavigate();
  const store = useCurrentStore();
  const { id } = useParams();
  const { data: customerData } = useCustomer(id);
  const { handleSubmit, control, reset } = useForm<customerSchemaType>({
    resolver: zodResolver(customerSchema),
    defaultValues: {},
  })

  const pageTitle = useMemo(
    () => customerData?.data ? `${customerData?.data.firstname} ${customerData?.data.lastname}` : t('customer.newPageTitle'),
    [t,customerData]
  )

  useBreadCrumbContext([
    { label: t('customers.pageTitle'), url: '/customers'},
    { label: pageTitle},
  ])

  const { mutate: createApiCustomer } = useMutation({
    mutationFn: (newData: customerSchemaType) =>
      createCustomer({ ...newData, storeId: store?.id }),
    onSuccess: (data) => {
      queryClient.setQueryData(['customers', {id}], data)
      navigate(`/customers/${data.data.id}/edit`);
      showSuccessToast(
        t("toast.created", { entity: t("models.customers.title") })
      );
    },
  });

  const { mutate: updateApiCustomer } = useMutation({
    mutationFn: (newData: customerSchemaType) => updateCustomer(id, newData),
    onSuccess: (data) => {
      queryClient.setQueryData(['customers', {id}], data)
      showSuccessToast(t("toast.updated"));
    },
  });

  const onSubmit = useCallback((data: customerSchemaType) => {
    if (id) {
      return updateApiCustomer(data)
    }
    return createApiCustomer(data)
  }, [id, updateApiCustomer, createApiCustomer])


  useEffect(() => {
    reset(customerData?.data)
  }, [customerData, reset])

  return (
    <FormContainer
      title={pageTitle}
      subtitle={t('customer.pageSubtitle')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormSection
        title={t('customer.generalInformations')}
      >
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

export default Customer;
