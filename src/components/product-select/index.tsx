import { useCurrentStore, useProduct } from '@/hooks'
import { useCallback } from 'react'
import { getProducts } from '@/api'
import ApiDataSelect from '../api-data-select'

type ProductSelectProps = {
  onChange: (newValue?: Product['id']) => void
  value?: Product['id']
  label?: string
  error?: string
}

const ProductSelect = ({
  onChange,
  value,
  label,
  error,
}: ProductSelectProps) => {
  const store = useCurrentStore()

  const getFilteredRecords = useCallback(
    (searchQuery) => {
      return getProducts({
        'q[storeIdEq]': store?.id,
        'q[nameOrSkuOrManufacturerSkuOrUpcCont]': searchQuery,
        'q[s]': ['name']
      })
    },
    [store]
  )

  return (
    <ApiDataSelect
      error={error}
      label={label}
      onChange={onChange}
      value={value}
      useRecordHook={useProduct}
      getRecordValue={(record: Product) => record.id}
      getRecordLabel={(record: Product) => `${record.name} - ${record.manufacturerCode}`}
      getFilteredRecords={getFilteredRecords}
    />
  )
}

export default ProductSelect
