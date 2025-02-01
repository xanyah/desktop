import { Link } from 'react-router-dom'
import { useCurrentStore, useProducts } from '../../hooks'
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
  const { data, isLoading } = useProducts({
    'q[nameOrSkuOrUpcCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': ['name', 'manufacturers.name'],
    page: page,
  })

  const columnHelper = createColumnHelper<Product>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('sku', {
          header: 'SKU',
        }),
        columnHelper.accessor('upc', {
          header: 'UPC',
        }),
        columnHelper.accessor('name', {
          header: 'Name',
        }),
        columnHelper.accessor('category.name', {
          header: 'Category',
          cell: (props) => (
            <Link
              className="underline"
              to={`/categories/${props.row.original.category?.id}`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('manufacturer.name', {
          header: 'Manufacturer',
          cell: (props) => (
            <Link
              className="underline"
              to={`/manufacturers/${props.row.original.manufacturer?.id}`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('quantity', {
          header: 'Quantity',
        }),
        columnHelper.accessor('amountCents', {
          header: 'Price',
          cell: (props) => (
            <span>
              {formatPrice(props.getValue(), props.row.original.amountCurrency)}
            </span>
          ),
        }),
      ] as ColumnDef<Product>[],
    [columnHelper]
  )

  return (
    <TableWithSearch
      searchPlaceholder="Search a product"
      onSearchQueryChange={setSearchQuery}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
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
