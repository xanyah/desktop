import { useCallback, useMemo } from 'react'
import { map } from 'lodash'
import { UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { AsyncReactSelect } from '../ui'

interface ApiDataSelectProps {
  onChange: (newValue?: string) => void
  value?: string
  useRecordHook: (recordId?: string) => UseQueryResult<AxiosResponse<any>>
  getRecordValue: (record: any) => string
  getRecordLabel: (record: any) => string
  getFilteredRecords: (searchQuery: string) => Promise<AxiosResponse<any[]>>
  label?: string
  error?: string
}

const ApiDataSelect = ({
  onChange,
  value,
  useRecordHook,
  getRecordLabel,
  getRecordValue,
  getFilteredRecords,
  label,
  error,
}: ApiDataSelectProps) => {
  const { data } = useRecordHook(value)

  const formatRecord = useCallback(
    (record: unknown) => {
      return {
        value: getRecordValue(record),
        label: getRecordLabel(record),
      }
    },
    [getRecordLabel, getRecordValue],
  )

  const selectValue = useMemo(() => {
    if (data?.data) {
      return formatRecord(data.data)
    }
    return null
  }, [data, formatRecord])

  const loadOptions = useCallback(
    async (inputValue: string) => {
      const { data } = await getFilteredRecords(inputValue)
      return map(data, formatRecord)
    },
    [getFilteredRecords, formatRecord],
  )

  return (
    <AsyncReactSelect
      cacheOptions
      defaultOptions
      onChange={item => onChange(item?.value)}
      value={selectValue}
      loadOptions={loadOptions}
      label={label}
      error={error}
    />
  )
}

export default ApiDataSelect
