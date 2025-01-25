import { CategorySelect, ManufacturerSelect, ProviderSelect } from "@/components"
import CurrencyInput from 'react-currency-input-field';
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { useCurrentStore } from "@/hooks";
import { useEffect } from "react";
import { toNumber } from "lodash";

const formSchema = z.object({
  name: z.string(),
  categoryId: z.string(),
  manufacturerId: z.string(),
  storeId: z.string(),
  amount: z.number(),
  buyingAmount: z.number(),
  taxFreeAmount: z.number(),
  providerId: z.string(),
  sku: z.string(),
  upc: z.string(),
})

type ProductFormProps = {
  initialValues?: Partial<z.infer<typeof formSchema>>
  onSubmit: (values: z.infer<typeof formSchema>) => void
}

const ProductForm = ({ initialValues, onSubmit }: ProductFormProps) => {
  const store = useCurrentStore()
  const { register, handleSubmit, control, setValue, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  useEffect(() => {
    if (store) {
      setValue("storeId", store?.id)
    }
  }, [store, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <input {...register('storeId')} type="hidden" />
      <input
        {...register('name')}
        placeholder="name"
        type="text"
        name="name"
      />
      <input
        {...register('sku')}
        placeholder="sku"
        type="text"
        name="sku"
      />
      <input
        {...register('upc')}
        placeholder="upc"
        type="text"
        name="upc"
      />
      <Controller
        control={control}
        name="categoryId"
        render={({ field: { onChange, value } }) => (
          <CategorySelect onChange={onChange} value={value} />
        )}
      />
      <Controller
        control={control}
        name="manufacturerId"
        render={({ field: { onChange, value } }) => (
          <ManufacturerSelect onChange={onChange} value={value} />
        )}
      />
      <Controller
        control={control}
        name="providerId"
        render={({ field: { onChange, value } }) => (
          <ProviderSelect onChange={onChange} value={value} />
        )}
      />
      <Controller
        control={control}
        name="buyingAmount"
        render={({ field: { onChange, value } }) => (
          <CurrencyInput
            placeholder="Buying Amount"
            decimalsLimit={2}
            groupSeparator=" "
            decimalSeparator=","
            value={value}
            suffix="€"
            onValueChange={newValue => onChange(toNumber(newValue))}
          />)}
      />
      <Controller
        control={control}
        name="taxFreeAmount"
        render={({ field: { onChange, value } }) => (
          <CurrencyInput
            placeholder="Tax Free Amount"
            decimalsLimit={2}
            groupSeparator=" "
            decimalSeparator=","
            value={value}
            suffix="€"
            onValueChange={newValue => onChange(toNumber(newValue))}
          />)}
      />
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
          // TODO: Should be tax_free amount * category.vat_rate
          <CurrencyInput
            placeholder="Amount"
            decimalsLimit={2}
            groupSeparator=" "
            decimalSeparator=","
            value={value}
            suffix="€"
            onValueChange={newValue => onChange(toNumber(newValue))}
          />)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default ProductForm
