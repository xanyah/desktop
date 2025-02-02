import { Link } from 'react-router-dom'
import { useCurrentStore, useInventories } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { Badge } from '@/components/ui/badge'

const Inventories = () => {
  useBreadCrumbContext([{ label: 'Inventories' }])
  const currentStore = useCurrentStore()
  const [page, setPage] = useState(1)

  const { data, isLoading } = useInventories({
    'q[storeIdEq]': currentStore?.id,
  })

  const columnHelper = createColumnHelper<Inventory>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('lockedAt', {
          header: 'Statut',
          cell: props =>
            props.getValue()
              ? (
                  <Badge variant="outline">Locked</Badge>
                )
              : (
                  <Badge variant="default">Open</Badge>
                ),
        }),
        columnHelper.accessor('id', {
          header: 'ID',
          cell: props => (
            <Link className="underline" to={`/orders/${props.getValue()}`}>
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('createdAt', {
          header: 'Creation date',
        }),
      ] as ColumnDef<Inventory>[],
    [columnHelper],
  )

  return (
    <TableWithSearch
      searchPlaceholder="Search an inventory"
      isLoading={isLoading}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Inventories
