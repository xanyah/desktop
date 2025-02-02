import { Link } from 'react-router-dom'
import { useCurrentStore, useProducts } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { formatPrice } from '@/helpers/price'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'

const Products = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('products.pageTitle') }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useProducts({
    'q[nameOrSkuOrUpcCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': ['name', 'manufacturers.name'],
    'page': page,
  })

  const columnHelper = createColumnHelper<Product>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('sku', {
          header: t('products.table.sku'),
          cell: props => (
            <Link
              className="underline"
              to={`/products/${props.row.original.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('manufacturerSku', {
          header: t('products.table.manufacturerSku'),
        }),
        columnHelper.accessor('name', {
          header: t('products.table.name'),
        }),
        columnHelper.accessor('category.name', {
          header: t('products.table.category'),
          cell: props => (
            <Link
              className="underline"
              to={`/categories/${props.row.original.category?.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('manufacturer.name', {
          header: t('products.table.manufacturer'),
          cell: props => (
            <Link
              className="underline"
              to={`/manufacturers/${props.row.original.manufacturer?.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('quantity', {
          header: t('products.table.quantity'),
        }),
        columnHelper.accessor('amountCents', {
          header: t('products.table.amount'),
          cell: props => (
            <span>
              {formatPrice(props.getValue(), props.row.original.amountCurrency)}
            </span>
          ),
        }),
      ] as ColumnDef<Product>[],
    [t, columnHelper],
  )

  return (
    <TableWithSearch
      searchPlaceholder={t('products.searchPlaceholder')}
      onSearchQueryChange={setSearchQuery}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl="/products/new"
      createLabel={t('products.createButtonLabel')}
      columns={columns}
      data={data?.data}
    />
  )
}

export default Products
