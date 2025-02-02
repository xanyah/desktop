import { useCurrentStore, useManufacturer } from '@/hooks'
import { useCallback } from 'react'
import { getManufacturers } from '@/api'
import ApiDataSelect from '../api-data-select'

interface ManufacturerSelectProps {
  onChange: (newValue?: Manufacturer['id']) => void
  value: Manufacturer['id']
  label?: string
  error?: string
}

const ManufacturerSelect = ({
  onChange,
  value,
  label,
  error,
}: ManufacturerSelectProps) => {
  const store = useCurrentStore()

  const getFilteredRecords = useCallback(
    (searchQuery) => {
      return getManufacturers({
        'q[storeIdEq]': store?.id,
        'q[nameOrNoteCont]': searchQuery,
      })
    },
    [store],
  )

  return (
    <ApiDataSelect
      label={label}
      error={error}
      onChange={onChange}
      value={value}
      useRecordHook={useManufacturer}
      getRecordValue={(record: Manufacturer) => record.id}
      getRecordLabel={(record: Manufacturer) => record.name}
      getFilteredRecords={getFilteredRecords}
    />
  )
}

export default ManufacturerSelect
