import { Link } from 'react-router-dom'
import { useCurrentStore, useCustomAttributes, usePaginatedSearch } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'

const CustomAttributes = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('customAttributes.pageTitle') }])
  const currentStore = useCurrentStore()
  const { searchQuery, page, setPage, onSearchQueryChange } = usePaginatedSearch()
  const { data, isLoading } = useCustomAttributes({
    page,
    'q[nameCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': ['name'],
  })

  const columnHelper = createColumnHelper<CustomAttribute>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('name', {
          header: t('customAttributes.table.name'),
          cell: props => (
            <Link
              className="underline"
              to={`/custom-attributes/${props.row.original.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('type', {
          header: t('customAttributes.table.type'),
        }),
      ] as ColumnDef<CustomAttribute>[],
    [t, columnHelper],
  )

  return (
    <TableWithSearch
      searchPlaceholder={t('customAttributes.searchPlaceholder')}
      onSearchQueryChange={onSearchQueryChange}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl="/custom-attributes/new"
      createLabel={t('customAttributes.createButtonLabel')}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default CustomAttributes
