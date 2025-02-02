import { Link } from 'react-router-dom'
import { useCurrentStore, useOrders } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { orderBadgeVariants } from '@/constants/orders'
import { customerFullname } from '@/helpers/customer'
import { formatLongDatetime } from '@/helpers/dates'
import { uuidNumber } from '@/helpers/uuid'
import { useTranslation } from 'react-i18next'

const Orders = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('orders.pageTitle') }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useOrders({
    page,
    'q[clientFirstnameOrClientLastnameCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': 'created_at desc',
  })

  const columnHelper = createColumnHelper<Order>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('id', {
          header: t('orders.table.id'),
          cell: props => (
            <Link className="underline" to={`/orders/${props.getValue()}`}>
              {uuidNumber(props.getValue())}
            </Link>
          ),
        }),
        columnHelper.accessor(
          row => customerFullname(row.customer),
          {
            id: 'fullname',
            header: t('orders.table.customer'),
            cell: props => (
              <Link
                className="underline"
                to={`/customers/${props.row.original.customer.id}/edit`}
              >
                {props.getValue()}
              </Link>
            ),
          },
        ),
        columnHelper.accessor('state', {
          header: t('orders.table.state'),
          cell: props => (
            <Badge variant={orderBadgeVariants[props.getValue()]}>
              {t(`order.states.${props.getValue()}`)}
            </Badge>
          ),
        }),
        columnHelper.accessor('createdAt', {
          header: t('orders.table.createdAt'),
          cell: props => formatLongDatetime(props.getValue()),
        }),
        columnHelper.accessor('updatedAt', {
          header: t('orders.table.updatedAt'),
          cell: props => formatLongDatetime(props.getValue()),
        }),
      ] as ColumnDef<Order>[],
    [t, columnHelper],
  )

  return (
    <TableWithSearch
      searchPlaceholder={t('orders.searchPlaceholder')}
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl="/orders/new"
      createLabel={t('orders.createButtonLabel')}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Orders
