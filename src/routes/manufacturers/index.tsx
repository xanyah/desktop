import { Link } from 'react-router-dom'
import { useCurrentStore, useManufacturers } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'

const Manufacturers = () => {
  useBreadCrumbContext([{ label: 'Manufacturers' }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useManufacturers({
    page,
    'q[nameOrNotesCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
  })

  const columnHelper = createColumnHelper<Manufacturer>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('name', {
          header: 'Name',
          cell: (props) => (
            <Link
              className="underline"
              to={`/manufacturers/${props.row.original.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
      ] as ColumnDef<Manufacturer>[],
    [columnHelper]
  )

  return (
    <TableWithSearch
      searchPlaceholder="Search a manufacturer"
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl={'/manufacturers/new'}
      createLabel={'Create a manufacturer'}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Manufacturers
