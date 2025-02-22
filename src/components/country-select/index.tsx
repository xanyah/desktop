import { useCurrentStore } from '@/hooks'
import { useCallback } from 'react'
import { getCountries } from '@/api'
import ApiDataSelect from '../api-data-select'
import { useCountry } from '@/hooks/countries'

interface CountryProps {
  onChange: (newValue?: Country['id']) => void
  value?: Country['id']
  label: string
  placeholder: string
  error?: string
}

const CountrySelect = ({
  onChange,
  value,
  placeholder,
  label,
  error,
}: CountryProps) => {
  const store = useCurrentStore()

  const getFilteredRecords = useCallback(
    (searchQuery) => {
      return getCountries({
        'q[nameCont]': searchQuery,
        'q[s]': 'name',
      })
    },
    [],
  )

  return (
    <ApiDataSelect
      key={store?.id}
      error={error}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      useRecordHook={useCountry}
      getRecordValue={(record: Country) => record.id}
      getRecordLabel={(record: Country) => record.name}
      getFilteredRecords={getFilteredRecords}
    />
  )
}

export default CountrySelect
