import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, CustomerSelect, RightPanel } from '@/components'
import { Plus } from 'lucide-react'
import CustomerForm from '../../routes/customer'

interface Props<T extends FieldValues> {
  isPanelOpen: boolean
  setIsPanelOpen: (value: boolean) => void
  control: Control<T>
  name: Path<T>
  onSuccess?: (data: Customer) => void
}

function CustomerPanelForm<T extends FieldValues>({
  control,
  isPanelOpen,
  setIsPanelOpen,
  onSuccess,
  name,
}: Props<T>) {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-row items-end gap-4">
        <Controller
          control={control}
          name={name}
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
            onSuccess?.(data)
            setIsPanelOpen(false)
          }}
        />
      </RightPanel>
    </>
  )
}

export default CustomerPanelForm
