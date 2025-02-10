import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { CheckoutSchemaType } from './schema'
import { CustomerPanelForm } from '@/components'

const Customer = () => {
  const { control, setValue } = useFormContext<CheckoutSchemaType>()
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  return (
    <>
      <CustomerPanelForm
        onSuccess={(data) => {
          setValue('customerId', data.id)
          setIsPanelOpen(false)
        }}
        name="customerId"
        control={control}
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
      />
    </>
  )
}

export default Customer
