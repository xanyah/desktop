import {
  Button,
  CategorySelect,
  FormContainer,
  FormSection,
  InputText,
  ManufacturerSelect,
} from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useCurrentStore } from '@/hooks'
import { useEffect } from 'react'
import { formSchema, formSchemaType } from './config'
import { toNumber } from 'lodash'
import { Euro } from 'lucide-react'

type ProductFormProps = {
  initialValues?: Partial<formSchemaType>
  onSubmit: (values: formSchemaType) => void
}

const ProductForm = ({ initialValues, onSubmit }: ProductFormProps) => {
  const store = useCurrentStore()
  const { handleSubmit, control, setValue, reset } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  useEffect(() => {
    if (store) {
      setValue('storeId', store?.id)
    }
  }, [store, setValue])

  return (
    <FormContainer
      title="Nouveau produit"
      subtitle="Saisissez ici les informations de votre produit"
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
              id="name"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder="name"
              type="text"
              label="name"
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
              label="Categories"
            />
          )}
        />
        <Controller
          control={control}
          name="manufacturerId"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <ManufacturerSelect
              error={error?.message}
              onChange={onChange}
              value={value}
              label="Manufacturers"
            />
          )}
        />
      </FormSection>

      <FormSection
        title="Logistique"
      >
        <Controller
          control={control}
          name="manufacturerSku"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              id="sku"
              hint="Le code fabricant du produit"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder="sku"
              type="text"
              label="sku"
            />
          )}
        />

        <Controller
          control={control}
          name="upc"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              id="upc"
              hint="Le code barre original du produit"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder="upc"
              type="text"
              label="Upc"
            />
          )}
        />

        <Controller
          control={control}
          name="sku"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              id="sku"
              hint="Le code barre personnalisé de votre produit (peut être le même que l'UPC)"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder="sku"
              type="text"
              label="sku"
            />
          )}
        />
      </FormSection>


      <FormSection
        title="Tarification"
      >
        <Controller
          control={control}
          name="buyingAmount"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              icon={<Euro />}
              id="buyingAmount"
              step="0.1"
              type="number"
              placeholder="Buying Amount"
              label="Buying Amount"
              value={value}
              onChange={(e) => onChange(toNumber(e.target.value))}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="taxFreeAmount"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              icon={<Euro />}
              id="taxFreeAmount"
              step="0.1"
              type="number"
              label="Tax Free Amount"
              placeholder="Tax Free Amount"
              value={value}
              onChange={(e) => onChange(toNumber(e.target.value))}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            // TODO: Should be tax_free amount * category.vat_rate
            <InputText
              icon={<Euro />}
              id="amount"
              step="0.1"
              type="number"
              placeholder="Amount"
              label="Amount"
              value={value}
              onChange={(e) => onChange(toNumber(e.target.value))}
              error={error?.message}
            />
          )}
        />
      </FormSection>
    </FormContainer>
  )
}

export default ProductForm
