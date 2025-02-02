import { useCheckoutAmounts, useCurrentStore, usePaymentTypes } from '@/hooks'
import { head, map, size } from 'lodash'
import { CheckoutSchemaType } from './schema'
import { Button } from '@/components'
import { useFormContext } from 'react-hook-form'
import { useCallback, useState } from 'react'
import CustomPayment from './custom-payment'
import { useTranslation } from 'react-i18next'

const Payment = () => {
  const { t } = useTranslation()
  const store = useCurrentStore()
  const [other, setOther] = useState(false)
  const { setValue, watch } = useFormContext<CheckoutSchemaType>()
  const { data } = usePaymentTypes({
    'q[s]': 'name',
    'q[storeIdEq]': store?.id,
  })
  const { totalAmountCents } = useCheckoutAmounts()
  const salePaymentsAttributes = watch('salePaymentsAttributes')

  const onPaymentTypeSelect = useCallback((paymentType: PaymentType) => {
    setValue('salePaymentsAttributes', [
      { paymentTypeId: paymentType.id, totalAmountCents, totalAmountCurrency: 'EUR' },
    ])
  }, [setValue, totalAmountCents])

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {map(data?.data, paymentType => (
          <Button
            key={paymentType.id}
            onClick={() => onPaymentTypeSelect(paymentType)}
            variant={size(salePaymentsAttributes) === 1 && head(salePaymentsAttributes)?.paymentTypeId === paymentType.id
              ? 'primary'
              : 'outline'}
          >
            {paymentType.name}
          </Button>
        ))}
        <Button
          onClick={() => setOther(true)}
          variant={other ? 'primary' : 'outline'}
        >
          {t('checkout.paymentMethodOtherButton')}
        </Button>
      </div>
      {other && <CustomPayment />}
    </>
  )
}

export default Payment
