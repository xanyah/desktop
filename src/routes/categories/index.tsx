import { Link } from 'react-router-dom'
import { useCurrentStore, useCategories } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'

const Categories = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('categories.pageTitle') }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useCategories({
    page,
    'q[nameOrCategoryNameCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': ['name'],
  })

  const columnHelper = createColumnHelper<Category>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('name', {
          header: t('categories.table.name'),
          cell: props => (
            <Link
              className="underline"
              to={`/categories/${props.row.original.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('category.name', {
          header: t('categories.table.parentCategory'),
        }),
        columnHelper.accessor('vatRate.ratePercentCents', {
          header: t('categories.table.vat'),
          cell: props => props.getValue() ? `${props.getValue() / 100}%` : '',
        }),
      ] as ColumnDef<Category>[],
    [t, columnHelper],
  )

  return (
    <TableWithSearch
      searchPlaceholder={t('categories.searchPlaceholder')}
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl="/categories/new"
      createLabel={t('categories.createButtonLabel')}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Categories
