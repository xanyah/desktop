import { Link } from 'react-router-dom'
import { useCurrentStore, useOrders } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { Badge, BadgeProps } from '@/components/ui/badge'

const badgeVariants: Record<Order['status'], BadgeProps['variant']> = {
  'cancelled': 'destructive',
  'delivered': 'secondary',
  'pending': 'default'
}

const Orders = () => {
  useBreadCrumbContext([{ label: 'Orders' }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const { data, isLoading } = useOrders({
    'q[clientFirstnameOrClientLastnameCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id
  })

  const columnHelper = createColumnHelper<Order>()

  const columns = useMemo(() => ([
    columnHelper.accessor('status', {
      header: 'Statut',
      cell: (props) => <Badge variant={badgeVariants[props.getValue()]}>{props.getValue()}</Badge>
    }),
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (props) => <Link className='underline' to={`/orders/${props.getValue()}`}>{props.getValue()}</Link>
    }),
    columnHelper.accessor(row => `${row.client.firstname} ${row.client.lastname}`, {
      id: 'fullname',
      header: 'Client',
      cell: (props) => <Link className='underline' to={`/clients/${props.row.original.client.id}`}>{props.getValue()}</Link>
    }),
    columnHelper.accessor('createdAt', {
      header: 'Creation date',
    }),
  ]) as ColumnDef<Order>[], [columnHelper])

  return (
    <TableWithSearch
      searchPlaceholder="Search an order"
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl={'/orders/new'}
      createLabel={'Create an order'}
      columns={columns}
      data={data?.data}
    />
  )

}

export default Orders
