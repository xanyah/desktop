import { Link } from 'react-router-dom'
import { useCurrentStore, useShippings } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { formatLongDatetime } from '@/helpers/dates'
import { Badge } from '@/components/ui/badge'
import { orderBadgeVariants } from '@/constants/orders'
import { uuidNumber } from '@/helpers/uuid'

const Shippings = () => {
  useBreadCrumbContext([{ label: 'Shippings' }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useShippings({
    page,
    'q[idOrProviderNameCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
  })

  const columnHelper = createColumnHelper<Shipping>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('id', {
          header: 'Numéro',
          cell: (props) => (
            <Link className="underline" to={`/shippings/${props.getValue()}`}>
              {uuidNumber(props.getValue())}
            </Link>
          ),
        }),
        columnHelper.accessor('provider.name', {
          header: 'Fournisseur',
          cell: (props) => (
            <Link
              className="underline"
              to={`/providers/${props.row.original.provider.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('state', {
          header: 'Statut',
          cell: (props) => (
            <Badge variant={orderBadgeVariants[props.getValue()]}>
              {props.getValue()}
            </Badge>
          ),
        }),
        columnHelper.accessor('createdAt', {
          header: 'Date de création',
          cell: props => formatLongDatetime(props.getValue())
        }),
        columnHelper.accessor('updatedAt', {
          header: 'Dernière mise à jour',
          cell: props => formatLongDatetime(props.getValue())
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
