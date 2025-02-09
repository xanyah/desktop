import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CheckoutSchemaType } from './schema'
import { useTranslation } from 'react-i18next'
import { Button, CustomerSelect, RightPanel } from '@/components'
import { Plus } from 'lucide-react'
import CustomerForm from '../customer'

const Customer = () => {
  const { t } = useTranslation()
  const { control, setValue } = useFormContext<CheckoutSchemaType>()
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  return (
    <>
      <div className="flex flex-row items-end gap-4">
        <Controller
          control={control}
          name="customerId"
          render={({ field: { onChange, value } }) => (
            <CustomerSelect
              onChange={onChange}
              value={value}
              label=""
              placeholder={t('checkout.customerPlaceholder')}
            />
          )}
        />
        <Button type="button" onClick={() => setIsPanelOpen(true)}>
          <Plus />
          {t('checkout.newCustomerButtonLabel')}
        </Button>
      </div>

      <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <CustomerForm
          onCancel={() => setIsPanelOpen(false)}
          onSuccess={({ data }) => {
            setValue('customerId', data.id)
            setIsPanelOpen(false)
          }}
        />
      </RightPanel>
    </>
  )
}

export default Customer
