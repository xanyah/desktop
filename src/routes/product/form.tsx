import {
  Button,
  CategorySelect,
  InputText,
  ManufacturerSelect,
} from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useCurrentStore } from '@/hooks'
import { useEffect } from 'react'
import { formSchema, formSchemaType } from './config'
import { toNumber } from 'lodash'
import { StyledForm, StyledInputsGroup } from './styles'
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
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInputsGroup>
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
          name="sku"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              id="sku"
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
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder="upc"
              type="text"
              label="Upc"
            />
          )}
        />
      </StyledInputsGroup>

      <StyledInputsGroup>
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
      </StyledInputsGroup>

      <StyledInputsGroup>
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
      </StyledInputsGroup>
      <Button type="submit">Submit</Button>
    </StyledForm>
  )
}

export default ProductForm
