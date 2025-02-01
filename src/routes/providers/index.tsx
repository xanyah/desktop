import { Link } from 'react-router-dom'
import { useCurrentStore, useProviders } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'

const Providers = () => {
  useBreadCrumbContext([{ label: 'Providers' }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useProviders({
    page,
    'q[nameOrNotesCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
  })

  const columnHelper = createColumnHelper<Provider>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('name', {
          header: 'Name',
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
    [columnHelper]
  )

  return (
    <TableWithSearch
      searchPlaceholder="Search a provider"
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl={'/providers/new'}
      createLabel={'Create a provider'}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Providers
