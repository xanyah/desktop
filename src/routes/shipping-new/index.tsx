import { useCallback } from 'react'
import { useCurrentStore } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createShipping } from "../../api";
import { showSuccessToast } from "../../utils/notification-helper";
import { useTranslation } from "react-i18next";
import { CheckoutProductCard, ProviderSelect, FormContainer, FormSection } from '@/components';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ProductSelect from '@/components/product-select';
import { findIndex, map } from 'lodash';

const formSchema = z.object({
  providerId: z.string(),
  shippingProductsAttributes: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
    })
  )
})

type FormType = z.infer<typeof formSchema>

const Shipping = () => {
  const navigate = useNavigate();
  const store = useCurrentStore();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(formSchema)
  })
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'shippingProductsAttributes',
  });

  const { mutate: createApiShipping } = useMutation({
    mutationFn: (newData: any) =>
      createShipping({ ...newData, storeId: store?.id }),
    onSuccess: (data) => {
      navigate(`/shippings/${data.data.id}`);
      showSuccessToast(
        t("toast.created", { entity: t("models.shippings.title") })
      );
    },
  });

  const onSubmit = useCallback((data: FormType) => {
    createApiShipping({ ...data, storeId: store?.id })
  }, [store, createApiShipping])

  const onProductSelect = useCallback((newProductId?: Product['id']) => {
    if (!newProductId) { return }

    const existingProductIndex = findIndex(fields, { productId: newProductId })

    if (existingProductIndex !== -1) {
      update(existingProductIndex, {
        ...fields[existingProductIndex],
        quantity: fields[existingProductIndex].quantity + 1
      })
    } else {
      append({ productId: newProductId, quantity: 1 })
    }
  }, [fields, append, update])

  return (
    <FormContainer
      title="Nouvelle livraison"
      subtitle="Saisissez ici les données de votre nouvelle livraison"
      onSubmit={handleSubmit(onSubmit)}>
      <FormSection title="Informations générales">
        <Controller
          control={control}
          name="providerId"
          render={({ field: { onChange, value } }) => (
            <ProviderSelect
              onChange={onChange}
              value={value}
            />
          )}
        />
        <ProductSelect
          onChange={onProductSelect}
        />
        {map(fields, (field, index) => (
          <CheckoutProductCard
          withoutPrice
          productId={field.productId}
          quantity={field.quantity}
            key={field.productId}
            onRemove={() => remove(index)}
            onQuantityUpdate={(newQuantity) => update(index, {...field, quantity: newQuantity})}
            />
        ))}
      </FormSection>
    </FormContainer>
  )
}

export default Shipping;
