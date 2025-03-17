import { Link } from 'react-router-dom'
import { useCurrentStore, useManufacturers, usePaginatedSearch } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'

const Manufacturers = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('manufacturers.pageTitle') }])
  const currentStore = useCurrentStore()
  const { searchQuery, page, setPage, onSearchQueryChange } = usePaginatedSearch()

  const { data, isLoading } = useManufacturers({
    page,
    'q[nameOrNotesCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': 'name',
  })

  const columnHelper = createColumnHelper<Manufacturer>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('name', {
          header: t('manufacturers.table.name'),
          cell: props => (
            <Link
              className="underline"
              to={`/manufacturers/${props.row.original.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('code', {
          header: t('manufacturers.table.code'),
        }),
      ] as ColumnDef<Manufacturer>[],
    [t, columnHelper],
  )

  return (
    <TableWithSearch
      searchPlaceholder={t('manufacturers.searchPlaceholder')}
      onSearchQueryChange={onSearchQueryChange}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl="/manufacturers/new"
      createLabel={t('manufacturers.createButtonLabel')}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Manufacturers
