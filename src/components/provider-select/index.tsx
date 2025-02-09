import { useCurrentStore, useProvider } from '@/hooks'
import { useCallback } from 'react'
import { getProviders } from '@/api'
import ApiDataSelect from '../api-data-select'

interface ProviderSelectProps {
  onChange: (newValue?: Provider['id']) => void
  value: Provider['id']
  label: string
  placeholder: string
}

const ProviderSelect = ({ onChange, value, label, placeholder }: ProviderSelectProps) => {
  const store = useCurrentStore()

  const getFilteredRecords = useCallback((searchQuery) => {
    return getProviders({
      'q[storeIdEq]': store?.id,
      'q[nameOrNoteCont]': searchQuery,
      'q[s]': 'name',
    })
  }, [store])

  return (
    <ApiDataSelect
      key={store?.id}
      onChange={onChange}
      value={value}
      label={label}
      placeholder={placeholder}
      useRecordHook={useProvider}
      getRecordValue={(record: Provider) => record.id}
      getRecordLabel={(record: Provider) => record.name}
      getFilteredRecords={getFilteredRecords}
    />
  )
}

export default ProviderSelect
