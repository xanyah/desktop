import { Link } from 'react-router-dom'
import { useCurrentStore, useShippings } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'

const Shippings = () => {
  useBreadCrumbContext([{ label: 'Shippings' }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useShippings({
    page,
    'q[providerNameCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
  })

  const columnHelper = createColumnHelper<Shipping>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('id', {
          header: 'ID',
          cell: (props) => (
            <Link className="underline" to={`/shippings/${props.getValue()}`}>
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('provider.name', {
          header: 'Provider',
          cell: (props) => (
            <Link
              className="underline"
              to={`/providers/${props.row.original.provider.id}`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('createdAt', {
          header: 'Creation date',
        }),
      ] as ColumnDef<Shipping>[],
    [columnHelper]
  )

  return (
    <TableWithSearch
      searchPlaceholder="Search a shipping"
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl={'/shippings/new'}
      createLabel={'Create a shipping'}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Shippings
