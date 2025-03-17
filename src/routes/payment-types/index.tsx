import { Link } from 'react-router-dom'
import { useCurrentStore, usePaginatedSearch, usePaymentTypes } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'

const PaymentTypes = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('paymentTypes.pageTitle') }])
  const currentStore = useCurrentStore()
  const { searchQuery, page, setPage, onSearchQueryChange } = usePaginatedSearch()
  const { data, isLoading } = usePaymentTypes({
    page,
    'q[nameOrDescriptionCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': ['name'],
  })

  const columnHelper = createColumnHelper<PaymentType>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('name', {
          header: t('paymentTypes.table.name'),
          cell: props => (
            <Link
              className="underline"
              to={`/payment-types/${props.row.original.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('description', {
          header: t('paymentTypes.table.description'),
        }),
      ] as ColumnDef<PaymentType>[],
    [t, columnHelper],
  )

  return (
    <TableWithSearch
      searchPlaceholder={t('paymentTypes.searchPlaceholder')}
      onSearchQueryChange={onSearchQueryChange}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl="/payment-types/new"
      createLabel={t('paymentTypes.createButtonLabel')}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default PaymentTypes
