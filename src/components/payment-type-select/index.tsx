import { useCurrentStore, usePaymentType } from '@/hooks'
import { useCallback } from 'react'
import { getPaymentTypes } from '@/api'
import ApiDataSelect from '../api-data-select'

interface PaymentTypeSelectProps {
  onChange: (newValue?: PaymentType['id']) => void
  value?: PaymentType['id']
  label?: string
  error?: string
}

const PaymentTypeSelect = ({
  onChange,
  value,
  label,
  error,
}: PaymentTypeSelectProps) => {
  const store = useCurrentStore()

  const getFilteredRecords = useCallback(
    (searchQuery) => {
      return getPaymentTypes({
        'q[storeIdEq]': store?.id,
        'q[countryNameCont]': searchQuery,
        'q[s]': 'rate_percent_cents',
      })
    },
    [store],
  )

  return (
    <ApiDataSelect
      error={error}
      label={label}
      onChange={onChange}
      value={value}
      useRecordHook={usePaymentType}
      getRecordValue={(record: PaymentType) => record.id}
      getRecordLabel={(record: PaymentType) => record.name}
      getFilteredRecords={getFilteredRecords}
    />
  )
}

export default PaymentTypeSelect
