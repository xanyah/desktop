import { useCurrentStore, useCategory } from '@/hooks'
import { useCallback } from 'react'
import { getCategories } from '@/api'
import ApiDataSelect from '../api-data-select'

interface CategorySelectProps {
  onChange: (newValue?: Category['id']) => void
  value?: Category['id']
  label: string
  placeholder: string
  error?: string
  noSubcategories?: boolean
  categoryId?: string
}

const CategorySelect = ({
  onChange,
  value,
  placeholder,
  label,
  error,
  categoryId,
  noSubcategories,
}: CategorySelectProps) => {
  const store = useCurrentStore()

  const getFilteredRecords = useCallback(
    (searchQuery) => {
      return getCategories({
        'q[storeIdEq]': store?.id,
        'q[nameCont]': searchQuery,
        'q[categoryIdEq]': categoryId,
        'q[categoryIdNull]': noSubcategories ? '1' : undefined,
        'q[s]': 'name',
      })
    },
    [store, categoryId, noSubcategories],
  )

  return (
    <ApiDataSelect
      key={store?.id}
      error={error}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      useRecordHook={useCategory}
      getRecordValue={(record: Category) => record.id}
      getRecordLabel={(record: Category) => record.name}
      getFilteredRecords={getFilteredRecords}
    />
  )
}

export default CategorySelect
