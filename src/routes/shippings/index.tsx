import { Link } from 'react-router-dom'
import { useCurrentStore, usePaginatedSearch, useShippings } from '../../hooks'
import { TableWithSearch, Badge } from '@/components'
import { useMemo } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { formatLongDatetime } from '@/helpers/dates'

import { orderBadgeVariants } from '@/constants/orders'
import { uuidNumber } from '@/helpers/uuid'
import { useTranslation } from 'react-i18next'

const Shippings = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('shippings.pageTitle') }])
  const currentStore = useCurrentStore()
  const { searchQuery, page, setPage, onSearchQueryChange } = usePaginatedSearch()
  const { data, isLoading } = useShippings({
    page,
    'q[idOrProviderNameCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': 'created_at desc',
  })

  const columnHelper = createColumnHelper<Shipping>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('id', {
          header: t('shippings.table.id'),
          cell: props => (
            <Link className="underline" to={`/shippings/${props.getValue()}`}>
              {uuidNumber(props.getValue())}
            </Link>
          ),
        }),
        columnHelper.accessor('provider.name', {
          header: t('shippings.table.provider'),
          cell: props => (
            <Link
              className="underline"
              to={`/providers/${props.row.original.provider.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('state', {
          header: t('shippings.table.state'),
          cell: props => (
            <Badge variant={orderBadgeVariants[props.getValue()]}>
              {t(`shipping.states.${props.getValue()}`)}
            </Badge>
          ),
        }),
        columnHelper.accessor('createdAt', {
          header: t('shippings.table.createdAt'),
          cell: props => formatLongDatetime(props.getValue()),
        }),
        columnHelper.accessor('updatedAt', {
          header: t('shippings.table.updatedAt'),
          cell: props => formatLongDatetime(props.getValue()),
        }),
      ] as ColumnDef<Shipping>[],
    [columnHelper, t],
  )

  return (
    <TableWithSearch
      searchPlaceholder={t('shippings.searchPlaceholder')}
      onSearchQueryChange={onSearchQueryChange}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl="/shippings/new"
      createLabel={t('shippings.createButtonLabel')}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Shippings
