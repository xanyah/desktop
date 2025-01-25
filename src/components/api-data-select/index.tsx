import AsyncSelect from 'react-select/async';
import { useCurrentStore, useManufacturer } from "@/hooks"
import { useCallback, useMemo } from 'react';
import { getManufacturers } from '@/api';
import { map } from 'lodash';
import { SingleValue } from 'react-select';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

type ApiDataSelectProps = {
  onChange: (newValue?: string) => void
  value?: string
  useRecordHook: (recordId?: string) => UseQueryResult<AxiosResponse<any>>
  getRecordValue: (record: any) => string
  getRecordLabel: (record: any) => string
  getFilteredRecords: (searchQuery: string) => Promise<AxiosResponse<any[]>>
}

const ApiDataSelect = ({
  onChange,
  value,
  useRecordHook,
  getRecordLabel,
  getRecordValue,
  getFilteredRecords,
}: ApiDataSelectProps) => {
  const store = useCurrentStore()
  const {data} = useRecordHook(value)

  const formatRecord = useCallback((record: unknown) => {
    return {
      value: getRecordValue(record),
      label: getRecordLabel(record)
    }
  }, [getRecordLabel, getRecordValue])

  const selectValue = useMemo(() => {
    if (data?.data) {
      return formatRecord(data.data)
    }
    return null
  }, [data, formatRecord])

  const loadOptions = useCallback((inputValue: string) =>{
    return getFilteredRecords(inputValue)
    .then(({data}) => map(data, formatRecord))
    }, [store, formatRecord]);

  return <AsyncSelect
  cacheOptions
  defaultOptions
  onChange={(item) => onChange(item?.value)}
  value={selectValue}
  loadOptions={loadOptions}
  />
}

export default ApiDataSelect
