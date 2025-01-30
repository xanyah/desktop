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
    () => customerData?.data ? `${customerData?.data.firstname} ${customerData?.data.lastname}` : 'New customer',
  [customerData]
)

  useBreadCrumbContext([
    { label: 'Customers', url: '/customers'},
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
    console.log('onSubmit')
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
      subtitle="Saisissez ici les informations de votre client"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormSection
        title="Informations générales"
      >
      <Controller
        control={control}
        name="firstname"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputText
            error={error?.message}
            onChange={onChange}
            value={value}
            placeholder="Prénom du client"
            type="text"
            label="Prénom"
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
            placeholder="Nom de famille du client"
            type="text"
            label="Nom de famille"
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
            placeholder="Numéro de téléphone du client"
            type="text"
            label="Numéro de téléphone"
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
            placeholder="Adresse email du client"
            type="text"
            label="Adresse email"
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
            placeholder="Adresse postale du client"
            type="text"
            label="Adresse postale"
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
              placeholder="Notes"
              type="text"
              label="Notes"
            />
          )}
        />
      </FormSection>
    </FormContainer>
  )
}

export default Customer;
