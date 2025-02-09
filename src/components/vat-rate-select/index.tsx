import { useCurrentStore, useVatRate } from '@/hooks'
import { useCallback } from 'react'
import { getVatRates } from '@/api'
import ApiDataSelect from '../api-data-select'

interface VatRateSelectProps {
  onChange: (newValue?: VatRate['id']) => void
  value?: VatRate['id']
  label: string
  placeholder: string
  error?: string
}

const VatRateSelect = ({
  onChange,
  value,
  placeholder,
  label,
  error,
}: VatRateSelectProps) => {
  const store = useCurrentStore()

  const getFilteredRecords = useCallback(
    (searchQuery) => {
      return getVatRates({
        'q[storeIdEq]': store?.id,
        'q[countryNameCont]': searchQuery,
        'q[s]': 'rate_percent_cents',
      })
    },
    [store],
  )

  return (
    <ApiDataSelect
      key={store?.id}
      error={error}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      useRecordHook={useVatRate}
      getRecordValue={(record: VatRate) => record.id}
      getRecordLabel={(record: VatRate) => `${record.country.name} - ${record.ratePercentCents / 100}%`}
      getFilteredRecords={getFilteredRecords}
    />
  )
}

export default VatRateSelect
