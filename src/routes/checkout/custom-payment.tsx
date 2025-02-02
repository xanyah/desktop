import { useCheckoutAmounts, usePaymentTypes } from '@/hooks'
import { Euro, X } from 'lucide-react'
import { head, map, sum, toNumber } from 'lodash'
import { CheckoutSchemaType } from './schema'
import { Button, InputText, PaymentTypeSelect } from '@/components'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { formatPrice } from '@/helpers/price'
import { useTranslation } from 'react-i18next'

const CustomPayment = () => {
  const { t } = useTranslation()
  const { totalAmountCents } = useCheckoutAmounts()
  const { control, watch } = useFormContext<CheckoutSchemaType>()
  const { fields, append, remove } = useFieldArray<CheckoutSchemaType, 'salePaymentsAttributes', 'id'>({
    name: 'salePaymentsAttributes',
    control,
  })
  const { data } = usePaymentTypes()
  const salePaymentsAttributes = watch('salePaymentsAttributes')
  console.log(totalAmountCents)
  console.log(map(salePaymentsAttributes, item => toNumber(item.totalAmountCents)))
  console.log(sum(map(salePaymentsAttributes, item => toNumber(item.totalAmountCents))))
  const attributed = sum(map(salePaymentsAttributes, item => toNumber(item.totalAmountCents)))
  const unattributed = totalAmountCents - attributed

  return (
    <>
      {map(fields, (field, index) => (
        <div className="flex flex-row items-center gap-4" key={field.id}>
          <Controller
            name={`salePaymentsAttributes.${index}.paymentTypeId`}
            render={({ field: { onChange, value } }) => (
              <PaymentTypeSelect
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name={`salePaymentsAttributes.${index}.totalAmountCents`}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                onChange={onChange}
                type="number"
                value={value}
                error={error?.message}
              />
            )}
          />
          <div><Euro /></div>
          <Button variant="ghost" onClick={() => remove(index)}><X /></Button>
        </div>
      ))}
      {unattributed > 0 && (
        <p className="text-red-500 text-center">
          {t('checkout.customPaymentUnattributedPositive', { amount: formatPrice(unattributed, 'EUR') })}
        </p>
      )}
      {unattributed < 0 && (
        <p className="text-red-500 text-center">
          {t('checkout.customPaymentUnattributedNegative', { amount: formatPrice(unattributed, 'EUR') })}
        </p>
      )}
      <Button
        className="self-center"
        variant="ghost"
        onClick={() => append({ paymentTypeId: head(data?.data)?.id as string, totalAmountCents: 0, totalAmountCurrency: 'EUR' })}
      >
        {t('checkout.customPaymentAddButton')}
      </Button>
    </>
  )
}

export default CustomPayment
