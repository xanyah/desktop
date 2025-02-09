import { useCurrentStore, useCustomer } from '@/hooks'
import { useCallback } from 'react'
import { getCustomers } from '@/api'
import ApiDataSelect from '../api-data-select'
import { customerFullname } from '@/helpers/customer'

interface CustomerSelectProps {
  onChange: (newValue?: Customer['id']) => void
  value?: Customer['id']
  label: string
  placeholder: string
  error?: string
}

const CustomerSelect = ({
  onChange,
  value,
  label,
  placeholder,
  error,
}: CustomerSelectProps) => {
  const store = useCurrentStore()

  const getFilteredRecords = useCallback(
    (searchQuery) => {
      return getCustomers({
        'q[storeIdEq]': store?.id,
        'q[firstnameOrLastnameOrEmailOrPhoneCont]': searchQuery,
        'q[s]': ['firstname', 'lastname'],
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
      useRecordHook={useCustomer}
      getRecordValue={(record: Customer) => record.id}
      getRecordLabel={(record: Customer) => customerFullname(record)}
      getFilteredRecords={getFilteredRecords}
    />
  )
}

export default CustomerSelect
