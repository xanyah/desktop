import { Link } from 'react-router-dom'
import { useCurrentStore, useCustomers } from '../../hooks'
import { TableWithSearch } from '@/components'
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useBreadCrumbContext } from '@/contexts/breadcrumb'
import { useTranslation } from 'react-i18next'

const Customers = () => {
  const { t } = useTranslation()
  useBreadCrumbContext([{ label: t('customers.pageTitle') }])
  const currentStore = useCurrentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useCustomers({
    page,
    'q[firstnameOrLastnameOrPhoneOrEmailOrNotesCont]': searchQuery,
    'q[storeIdEq]': currentStore?.id,
    'q[s]': ['firstname', 'lastname'],
  })

  const columnHelper = createColumnHelper<Customer>()

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor(item => `${item.firstname} ${item.lastname}`, {
          header: t('customers.table.name'),
          cell: props => (
            <Link
              className="underline"
              to={`/customers/${props.row.original.id}/edit`}
            >
              {props.getValue()}
            </Link>
          ),
        }),
        columnHelper.accessor('phone', { header: t('customers.table.phone') }),
        columnHelper.accessor('email', { header: t('customers.table.email') }),
      ] as ColumnDef<Customer>[],
    [t, columnHelper],
  )

  return (
    <TableWithSearch
      searchPlaceholder={t('customers.searchPlaceholder')}
      onSearchQueryChange={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      createUrl="/customers/new"
      createLabel={t('customers.createButtonLabel')}
      columns={columns}
      data={data?.data}
      currentPage={page}
      totalPages={data?.headers['total-pages']}
      onPageChange={setPage}
    />
  )
}

export default Customers
