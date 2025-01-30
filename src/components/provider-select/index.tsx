import { useCurrentStore, useProvider } from "@/hooks"
import { useCallback } from 'react';
import { getProviders } from '@/api';
import ApiDataSelect from '../api-data-select';

type ProviderSelectProps = {
  onChange: (newValue?: Provider['id']) => void
  value: Provider['id']
}

const ProviderSelect = ({onChange, value}: ProviderSelectProps) => {
  const store = useCurrentStore()

  const getFilteredRecords = useCallback((searchQuery) => {
    return getProviders({
      'q[storeIdEq]': store?.id,
      'q[nameOrNoteCont]': searchQuery
    })
  }, [store])

  return <ApiDataSelect
  onChange={onChange}
  value={value}
  useRecordHook={useProvider}
  getRecordValue={(record: Provider) => record.id}
  getRecordLabel={(record: Provider) => record.name}
  getFilteredRecords={getFilteredRecords}
  />
}

export default ProviderSelect
