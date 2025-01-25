import { useCurrentStore, useCategory } from "@/hooks"
import { useCallback} from 'react';
import { getCategories } from '@/api';
import ApiDataSelect from '../api-data-select';

type CategorySelectProps = {
  onChange: (newValue?: Category['id']) => void
  value: Category['id']
}

const CategorySelect = ({onChange, value}: CategorySelectProps) => {
  const store = useCurrentStore()

  const getFilteredRecords = useCallback((searchQuery) => {
    return getCategories({
      'q[storeIdEq]': store?.id,
      'q[nameCont]': searchQuery
    })
  }, [store])

  return <ApiDataSelect
  onChange={onChange}
  value={value}
  useRecordHook={useCategory}
  getRecordValue={(record: Category) => record.id}
  getRecordLabel={(record: Category) => record.name}
  getFilteredRecords={getFilteredRecords}
  />
}

export default CategorySelect
