import { Link } from 'react-router-dom'
import { useCurrentStore, useSales } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { formatPrice } from '@/helpers/price'
import { uuidNumber } from '@/helpers/uuid'
import { formatLongDatetime } from '@/helpers/dates'
import { useTranslation } from 'react-i18next'

const Sales = () => {
  const {t} = useTranslation()
  useBreadCrumbContext([{ label: t('sales.pageTitle') }])
  const [searchQuery, setSearchQuery] = useState('')
  const currentStore = useCurrentStore()
  const [page, setPage] = useState(1)

  const { data, isLoading } = useSales({
    page,
    'q[userFirstnameOrUserLastnameCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': 'created_at desc'
  })

  const columnHelper = createColumnHelper<Sale>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('id', {
          header: t('sales.table.id'),
          cell: props => <Link className="underline" to={`/sales/${props.getValue()}`}>
            {uuidNumber(props.getValue())}
          </Link>
        }),
        columnHelper.accessor('totalAmountCents', {
          header: t('sales.table.amount'),
          cell: (props) => (
            <span>
              {formatPrice(
                props.getValue(),
                props.row.original.totalAmountCurrency
              )}
            </span>
          ),
        }),
        columnHelper.accessor(
          (row) => `${row.user.firstname} ${row.user.lastname}`,
          {
            id: 'fullname',
            header: t('sales.table.user'),
            cell: (props) => (
              <Link
                className="underline"
                to={`/users/${props.row.original.user.id}`}
              >
                {props.getValue()}
              </Link>
            ),
          }
        ),
        columnHelper.accessor('createdAt', {
          header: t('sales.table.createdAt'),
          cell: (props) => formatLongDatetime(props.getValue()),
        }),
      ] as ColumnDef<Sale>[],
    [t,columnHelper]
  )

  return (
    <TableWithSearch
      searchPlaceholder={t('sales.searchPlaceholder')}
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Sales
