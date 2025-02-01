import { Link } from 'react-router-dom'
import { useCurrentStore, useCategories } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'

const Categories = () => {
  useBreadCrumbContext([{ label: 'Categories' }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useCategories({
    page,
    'q[nameOrCategoryNameCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': ['name']
  })

  const columnHelper = createColumnHelper<Category>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('name', {
          header: 'Name',
          cell: (props) => (
            <Link
              className="underline"
              to={`/categories/${props.row.original.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('category.name', {
          header: 'Catégorie parente',
        }),
        columnHelper.accessor('vatRate.ratePercentCents', {
          header: 'Taux de taxe',
          cell: props => props.getValue() ? `${props.getValue() / 100}%` : ''
        }),
      ] as ColumnDef<Category>[],
    [columnHelper]
  )

  return (
    <TableWithSearch
      searchPlaceholder="Search a category"
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl={'/categories/new'}
      createLabel={'Create a category'}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Categories
