import { useCurrentStore, useProduct } from '@/hooks'
import { useCallback } from 'react'
import { getProducts } from '@/api'
import ApiDataSelect from '../api-data-select'

interface ProductSelectProps {
  onChange: (newValue?: Product['id']) => void
  value?: Product['id']
  label: string
  placeholder: string
  error?: string
}

const ProductSelect = ({
  onChange,
  value,
  label,
  placeholder,
  error,
}: ProductSelectProps) => {
  const store = useCurrentStore()

  const getFilteredRecords = useCallback(
    (searchQuery) => {
      return getProducts({
        'q[storeIdEq]': store?.id,
        'q[archivedAtNull]': true,
        'q[nameOrSkuOrManufacturerSkuOrUpcCont]': searchQuery,
        'q[s]': ['name'],
      })
    },
    [store],
  )

  return (
    <ApiDataSelect
      key={store?.id}
      error={error}
      label={label}
      onChange={onChange}
      value={value}
      useRecordHook={useProduct}
      getRecordValue={(record: Product) => record.id}
      getRecordLabel={(record: Product) =>
        record.manufacturerSku
          ? `${record.name} - ${record.manufacturerSku}`
          : record.name}
      getFilteredRecords={getFilteredRecords}
      placeholder={placeholder}
    />
  )
}

export default ProductSelect
