import { useCheckoutAmounts, usePaymentTypes } from '@/hooks'
import { Euro, X } from 'lucide-react'
import { head, map, sum, toNumber } from 'lodash'
import { CheckoutSchemaType } from './schema'
import { Button, InputText, PaymentTypeSelect } from '@/components'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { formatPrice, formatPriceCentsInput, formatPriceCentsInputValue } from '@/helpers/price'
import { useTranslation } from 'react-i18next'

const CustomPayment = () => {
  const { t } = useTranslation()
  const { totalAmountCents } = useCheckoutAmounts()
  const { control, watch } = useFormContext<CheckoutSchemaType>()
  const { fields, append, remove } = useFieldArray<
    CheckoutSchemaType,
    'salePaymentsAttributes',
    'id'
  >({
    name: 'salePaymentsAttributes',
    control,
  })
  const { data } = usePaymentTypes()
  const salePaymentsAttributes = watch('salePaymentsAttributes')
  const attributed = sum(
    map(salePaymentsAttributes, item => toNumber(item.totalAmountCents)),
  )
  const unattributed = totalAmountCents - attributed

  return (
    <>
      {map(fields, (field, index) => (
        <div className="flex flex-row items-end gap-4" key={field.id}>
          <Controller
            name={`salePaymentsAttributes.${index}.paymentTypeId`}
            render={({ field: { onChange, value } }) => (
              <PaymentTypeSelect
                label={t('checkout.customPayment.paymentTypeLabel')}
                placeholder={t('checkout.customPayment.paymentTypePlaceholder')}
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
                label={t('checkout.customPayment.totalAmountLabel')}
                onChange={e => onChange(formatPriceCentsInput(e))}
                min={0}
                type="number"
                value={formatPriceCentsInputValue(value)}
                error={error?.message}
                icon={<Euro />}
              />
            )}
          />
          <Button variant="ghost" onClick={() => remove(index)}>
            <X />
          </Button>
        </div>
      ))}
      {unattributed > 0 && (
        <p className="text-red-500 text-center">
          {t('checkout.customPayment.unattributedPositive', {
            amount: formatPrice(unattributed, 'EUR'),
          })}
        </p>
      )}
      {unattributed < 0 && (
        <p className="text-red-500 text-center">
          {t('checkout.customPayment.unattributedNegative', {
            amount: formatPrice(unattributed, 'EUR'),
          })}
        </p>
      )}
      <Button
        className="self-center"
        variant="ghost"
        onClick={() =>
          append({
            paymentTypeId: head(data?.data)?.id as string,
            totalAmountCents: 0,
            totalAmountCurrency: 'EUR',
          })}
      >
        {t('checkout.customPayment.addButton')}
      </Button>
    </>
  )
}

export default CustomPayment
