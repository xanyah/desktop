import { Link } from 'react-router-dom'
import { useCurrentStore, useProviders } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'

const Providers = () => {
  const {t} = useTranslation()
  useBreadCrumbContext([{ label: t('providers.pageTitle') }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useProviders({
    page,
    'q[nameOrNotesCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': 'name'
  })

  const columnHelper = createColumnHelper<Provider>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('name', {
          header: t('providers.table.name'),
          cell: (props) => (
            <Link
              className="underline"
              to={`/providers/${props.row.original.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
      ] as ColumnDef<Provider>[],
    [t,columnHelper]
  )

  return (
    <TableWithSearch
      searchPlaceholder={t('providers.searchPlaceholder')}
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl={'/providers/new'}
      createLabel={t('providers.createButtonLabel')}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Providers
