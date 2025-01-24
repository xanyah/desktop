import { Link } from 'react-router-dom'
import { useCurrentStore, useVariants } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { formatPrice } from '@/helpers/price'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'

const Products = () => {
  useBreadCrumbContext([{ label: 'Products' }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading,  } = useVariants({
    'q[barcodeOrOriginalBarcodeOrProductNameCont]': searchQuery,
    'q[productStoreIdEq]': currentStore?.id,
    'page': page,
  })

  console.log(data?.headers)

  const columnHelper = createColumnHelper<Variant>()

  const columns = useMemo(() => ([
    columnHelper.accessor('originalBarcode', {
      header: 'Barcode',
    }),
    columnHelper.accessor('product.name', {
      header: 'Name',
      cell: (props) => <Link className='underline' to={`/variants/${props.row.original.id}`}>{props.getValue()}</Link>
    }),
    columnHelper.accessor('product.category.name', {
      header: 'Category',
      cell: (props) => <Link className='underline' to={`/categories/${props.row.original.product.category?.id}`}>{props.getValue()}</Link>
    }),
    columnHelper.accessor('provider.name', {
      header: 'Provider',
      cell: (props) => <Link className='underline' to={`/providers/${props.row.original.provider?.id}`}>{props.getValue()}</Link>
    }),
    columnHelper.accessor('product.manufacturer.name', {
      header: 'Manufacturer',
      cell: (props) => <Link className='underline' to={`/manufacturers/${props.row.original.product.manufacturer?.id}`}>{props.getValue()}</Link>
    }),
    columnHelper.accessor('quantity', {
      header: 'Quantity',
    }),
    columnHelper.accessor('amountCents', {
      header: 'Price',
      cell: (props) => <span>{formatPrice(props.getValue(), props.row.original.amountCurrency)}</span>
    }),
  ]) as ColumnDef<Variant>[], [columnHelper])

  return (
    <TableWithSearch
      searchPlaceholder="Search a product"
      onSearchQueryChange={setSearchQuery}
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl={'/products/new'}
      createLabel={'Create a product'}
      columns={columns}
      data={data?.data}
    />
  )

}

export default Products
