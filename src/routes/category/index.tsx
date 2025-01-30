import { useCallback, useEffect} from 'react'
import { useCategory, useCurrentStore } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, updateCategory } from "../../api";
import { showSuccessToast } from "../../utils/notification-helper";
import DataDetails from "../../components/data-details";
import { useTranslation } from "react-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, categorySchemaType } from './config';
import { Controller, useForm } from 'react-hook-form';
import { CategorySelect, FormContainer, FormSection, InputText, VatRateSelect } from '@/components';
import { useBreadCrumbContext } from '@/contexts/breadcrumb';

const Category = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation();
  const navigate = useNavigate();
  const store = useCurrentStore();
  const { id } = useParams();
  const { data: categoryData } = useCategory(id);
  const { handleSubmit, control, reset } = useForm<categorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {},
  })
  useBreadCrumbContext([
    { label: 'Categories', url: '/categories'},
    { label: categoryData?.data ? categoryData?.data.name : 'New category'},
  ])

  const { mutate: createApiCategory } = useMutation({
    mutationFn: (newData: categorySchemaType) =>
      createCategory({ ...newData, storeId: store?.id }),
    onSuccess: (data) => {
      queryClient.setQueryData(['categories', {id}], data)
      navigate(`/categories/${data.data.id}/edit`);
      showSuccessToast(
        t("toast.created", { entity: t("models.categories.title") })
      );
    },
  });

  const { mutate: updateApiCategory } = useMutation({
    mutationFn: (newData: categorySchemaType) => updateCategory(id, newData),
    onSuccess: (data) => {
      queryClient.setQueryData(['categories', {id}], data)
      showSuccessToast(t("toast.updated"));
    },
  });

  const onSubmit = useCallback((data: categorySchemaType) => {
    if (id) {
      return updateApiCategory(data)
    }
    return createApiCategory(data)
  }, [id, updateApiCategory, createApiCategory])


  useEffect(() => {
    if (categoryData?.data) {
      reset({
        ...categoryData?.data,
        categoryId: categoryData?.data?.category?.id,
        vatRateId: categoryData?.data?.vatRate?.id,
      })
    }
  }, [categoryData, reset])

  return (
    <FormContainer
      title="Catégorie"
      subtitle="Saisissez ici les informations de votre catégorie"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormSection
        title="Informations générales"
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder="Nom de la catégorie"
              type="text"
              label="Nom"
            />
          )}
        />

        <Controller
          control={control}
          name="vatRateId"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <VatRateSelect
            error={error?.message}
            onChange={onChange}
            value={value}
            label="Catégorie de taxe"
          />
          )}
        />

        <Controller
          control={control}
          name="categoryId"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CategorySelect
            error={error?.message}
            onChange={onChange}
            value={value}
            label="Catégorie parente"
          />
          )}
        />
      </FormSection>
    </FormContainer>
  )
}

export default Category;
